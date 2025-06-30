<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title>Vue Learning Project</v-toolbar-title>
            <v-spacer />
            <v-btn text to="/todos" tag="router-link">Todo</v-btn>
            <v-btn text to="/news" tag="router-link">News</v-btn>
            <v-btn text to="/multiple-news" tag="router-link">Multiple News</v-btn>
            <v-btn text to="/head-info" tag="router-link">Head Info</v-btn>
            <v-btn text to="/tag-extract" tag="router-link">Tag Extract</v-btn>
        </v-app-bar>

        <v-main>
            <v-container fluid>
                <v-row class="justify-center">
                    <v-col cols="12" md="8">
                        <keep-alive>
                            <RouterView />
                        </keep-alive>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
