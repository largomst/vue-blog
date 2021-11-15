<template>
  <div class="flex gap-2 items-center">
    <div>
      <slot name="icon"></slot>
    </div>
    <div>
      <div class="text-gray-700 font-semibold block">
        <slot name="title" class=""></slot>
      </div>
      <div class="text-gray-400 text-sm block">
        <slot name="desc"></slot>
      </div>
    </div>
  </div>
</template>
