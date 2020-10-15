<template>
    <div class="text-center">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
        }
    },
}
</script>
