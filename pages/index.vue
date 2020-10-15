<template>
    <div>
        <Table />
        <Modal />
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue"
import Table from "@/components/Table.vue"

export default {
    components: {
        Modal,
        Table
    },
}
</script>
