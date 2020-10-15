<template>
    <v-data-table
        :headers="headers"
        :items="users"
        :items-per-page="10"
        class="elevation-1"
    ></v-data-table>
</template>

<script>
export default {
    mounted() {
        this.getUsers()
    },
    data () {
        return {
            headers: [
                { text: "User ID", value: "userId" },
                { text: "ID", value: "id" },
                { text: "Title", value: "title" },
                { text: "Body", value: "body" }
            ],
            users: []
        }
    },
    methods: { 
        async getUsers() {
            let res = await this.$store.dispatch('GET_USERS')
            this.users = res.data
        },
    },
}
</script>
