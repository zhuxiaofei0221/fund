<template>
    <div class="index">
       <header-nav></header-nav>
       <left-menu></left-menu>
       <div class="rightContainer">
           <router-view></router-view>
       </div>
    </div>
</template>

<script>
import HeaderNav from '../components/HeaderNav'
import LeftMenu from '../components/LeftMenu'
export default {
    name: 'index',
    components: {
        'header-nav': HeaderNav,
        'left-menu': LeftMenu
    }
}
</script>

<style scoped>
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden
    }
    .rightContainer {
        position: relative;
        top: 0;
        left: 200px;
        width: calc(100% - 200px);
        height: calc(100% - 60px);
        overflow: auto;
    }
</style>
