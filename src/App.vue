<template>
  <div :class="$style.el">
    <SearchBar
      v-model:value="searchQuery"
      :can-add="canAdd"
      :class="$style.searchBar"
      @add="onAdd" />
    <ul :class="$style.list">
      <li
        v-for="{ onDelete, ...item } in dataDisplayed"
        :key="item.id"
        :class="$style.list_item">
        <ListItem v-bind="item" @delete="onDelete" />
      </li>
    </ul>
    <div :class="$style.sort">
      <SortSidebar v-model:value="sortBy" />
    </div>
  </div>
</template>

<script lang="ts">
import ListItem from 'components/ListItem.vue';
import SearchBar from 'components/SearchBar.vue';
import SortSidebar from 'components/SortSidebar.vue';
import { isAfter, parseISO } from 'date-fns';
import { ListItem as Item } from 'types/ListItem';
import { SortBy } from 'types/SortBy';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'App',
  components: {
    ListItem,
    SearchBar,
    SortSidebar,
  },
  setup() {
    const searchQuery = ref('');

    const SORT_KEY = 'sortBy';
    const sortStorageValue = localStorage.getItem(SORT_KEY) as SortBy | null;
    const sortBy = ref<SortBy>(sortStorageValue || 'value');

    watch(sortBy, (sortBy) => {
      localStorage.setItem(SORT_KEY, sortBy);
    });

    const DATA_KEY = 'data';
    const storageValue = localStorage.getItem(DATA_KEY);
    const dataSource = ref<Item[]>(
      storageValue
        ? (
            JSON.parse(storageValue) as Array<{
              date: string;
              id: number;
              value: string;
            }>
          ).map(({ date, ...item }) => {
            return { ...item, date: parseISO(date) };
          })
        : []
    );

    watch(
      dataSource,
      (dataSource) => {
        localStorage.setItem(DATA_KEY, JSON.stringify(dataSource));
      },
      { deep: true }
    );

    const dataSearched = computed(() => {
      return dataSource.value.filter(({ value }) => {
        return new RegExp(searchQuery.value, 'i').test(value);
      });
    });

    const dataSorted = computed(() => {
      return [...dataSearched.value].sort((a, b) => {
        if (sortBy.value === 'date') return isAfter(a.date, b.date) ? -1 : 1;
        return a.value.toLowerCase() < b.value.toLowerCase() ? -1 : 1;
      });
    });

    const exactMatchIds = computed(() => {
      return dataSource.value
        .filter(({ value }) => {
          return value.toLowerCase() === searchQuery.value.toLowerCase();
        })
        .map(({ id }) => {
          return id;
        });
    });

    const dataDisplayed = computed(() => {
      return dataSorted.value.map((item) => {
        const isExactMatch = exactMatchIds.value.includes(item.id);
        return {
          ...item,
          isExactMatch,
          onDelete: (id: number) => {
            dataSource.value = dataSource.value.filter(({ id: idKey }) => {
              return idKey !== id;
            });
          },
        };
      });
    });

    const canAdd = computed(() => {
      return exactMatchIds.value.length === 0;
    });

    const newItemId = computed(() => {
      return Math.max(...dataSource.value.map(({ id }) => id), 0) + 1;
    });

    function onAdd(value: string) {
      dataSource.value.push({
        date: new Date(),
        id: newItemId.value,
        value,
      });
    }

    return {
      canAdd,
      dataDisplayed,
      onAdd,
      searchQuery,
      sortBy,
    };
  },
});
</script>

<style lang="scss" module>
@use 'sass/color';

.el {
  column-gap: 60px;
  display: grid;
  grid-template-areas: '. . search . .' '. . data sort .';
  grid-template-columns: 1fr 200px 800px 200px 1fr;
  grid-template-rows: auto 1fr;
  height: 100%;
  padding-bottom: 100px;
  padding-top: 100px;
}

.searchBar {
  grid-area: search;
  margin-bottom: 30px;
}

.list {
  grid-area: data;
  list-style: none;
  margin: 0;
  padding: 0;

  &_item {
    &:not(:first-child) {
      border-top: 1px solid color.$border;
    }
  }
}

.sort {
  grid-area: sort;
}
</style>
