<template>
    <v-card>
        <v-data-table
            :headers="headers"
            :items="users"
            :items-per-page="10"
            class="elevation-1"
            @click:row="editItem"
        >
        </v-data-table>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-actions>
                    <v-col cols="12">
                        <v-form ref="form">
                            <v-text-field label="ID" v-model="editedItem.id" readonly></v-text-field>
                            <v-text-field label="User ID" v-model="editedItem.userId"></v-text-field>
                            <v-text-field label="Title" v-model="editedItem.title"></v-text-field>
                            <v-text-field label="Body" v-model="editedItem.body"></v-text-field>
                            <v-btn color="primary" text @click="deleteItem">Delete</v-btn>
                            <v-btn color="primary" text @click="closeDialog">Close</v-btn>
                        </v-form>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            headers: [
                { text: "User ID", value: "userId" },
                { text: "ID", value: "id" },
                { text: "Title", value: "title" },
                { text: "Body", value: "body" }
            ],
            users: [],
            editedItem: {
                id: 0,
                userId: 0,
                title: "",
                body: "",
            }
        }
    },
    created() {
        this.initialize()
    },
    methods: { 
        async initialize() {
            let res = await this.$axios.get('http://jsonplaceholder.typicode.com/posts')
            this.users = res.data
        },
        editItem(item) {
            this.editedItem = item
            this.dialog = true
        },
        deleteItem() {
            this.users.splice(this.users.indexOf(this.editedItem), 1)
            this.closeDialog()
        },
        closeDialog() {
            this.dialog = false
        }
    },
}
</script>
