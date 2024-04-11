<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field v-model="sizeX" label="Size X"></v-text-field>
      </v-col>
      <v-col>
        <v-text-field v-model="sizeY" label="Size Y"></v-text-field>
      </v-col>
    </v-row>

    <div class="grid">
      <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="row">
        <div
          v-for="(col, colIndex) in row"
          :key="colIndex"
          class="square"
          :style="{
            backgroundColor: col ? 'blue' : 'white',
          }"
          @mouseover="toggleSquare(rowIndex, colIndex)"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const sizeX = ref('0');
const sizeY = ref('0');
const grid = ref([]);

const buildGrid = () => {
  const x = +sizeX.value || 0;
  const y = +sizeY.value || 0;
  grid.value = Array(x)
    .fill()
    .map(() => Array(y).fill(false));
};

const toggleSquare = (x, y) => {
  grid.value[x][y] = !grid.value[x][y];
};

watch([sizeX, sizeY], () => {
  buildGrid();
});
</script>

<style scoped>
.grid {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
  background-color: black;
  border: 1px solid black;

  margin: 0 auto;
}

.row {
  display: flex;
}

.square {
  width: 36px;
  height: 36px;
  cursor: pointer;
}
</style>
