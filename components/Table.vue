<template>
    <v-card>
        <v-data-table
            :headers="headers"
            :items="posts"
            :items-per-page="10"
            class="elevation-1"
            @click:row="editItem"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Posts</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="newItem">New item</v-btn>
                </v-toolbar>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-actions>
                    <v-col cols="12">
                        <v-form ref="form">
                            <v-text-field label="User ID" v-model="editedItem.userId"></v-text-field>
                            <v-text-field label="ID" v-model="editedItem.id" disabled></v-text-field>
                            <v-text-field label="Title" v-model="editedItem.title"></v-text-field>
                            <v-text-field label="Body" v-model="editedItem.body"></v-text-field>
                            <v-btn color="primary" v-if="dialogAdd" text @click="addItem">Add item</v-btn>
                            <v-btn color="primary" v-if="!dialogAdd" text @click="applyEdit">Apply editing</v-btn>
                            <v-btn color="primary" v-if="!dialogAdd" text @click="deleteItem">Delete</v-btn>
                            <v-btn color="primary" text @click="dialog = false">Close</v-btn>
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
            dialogAdd: false,
            nextId: 100,
            url: "http://jsonplaceholder.typicode.com/posts",
            headers: [
                { text: "User\u00A0ID", value: "userId" },
                { text: "ID", value: "id" },
                { text: "Title", value: "title" },
                { text: "Body", value: "body" }
            ],
            posts: [],
            editedItem: {
                id: 0,
                userId: 0,
                title: "",
                body: "",
            },
            defaultItem: {
                id: 0,
                userId: 1,
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
            let res = await this.$axios.get(this.url)
            this.posts = res.data
        },

        editItem(item) {
            Object.assign(this.editedItem, item)
            this.dialogAdd = false
            this.dialog = true
        },
        async applyEdit() {
            let res = await this.$axios.patch(this.url + "/"  + this.editedItem.id, this.editedItem)
            this.posts.find( function ( elem ) {
                if (elem.id === res.data.id) {
                    Object.assign(elem, res.data)
                    return elem
                }
            })
            this.dialog = false
        },
        async deleteItem() {
            await this.$axios.delete(this.url + "/" + this.editedItem.id)
            this.posts.splice(this.posts.findIndex(elem => elem.id === this.editedItem.id), 1)
            this.dialog = false
        },

        newItem() {
            Object.assign(this.editedItem, this.defaultItem)
            this.nextId = this.posts.reduce( function(prev, cur) {
                return cur.id > prev.id ? cur : prev
            }, { id : -Infinity }).id + 1
            this.editedItem.id = this.nextId
            this.dialogAdd = true
            this.dialog = true
        },
        async addItem() {
            let res = await this.$axios.post(this.url, this.editedItem)
            res.data.id = this.nextId
            this.posts.unshift(res.data)
            this.dialog = false
        }
    },
}
</script>
