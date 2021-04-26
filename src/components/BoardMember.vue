<template>
    <li>{{ member.boardMember }}
        <span v-if="me.email===owner || me.email === member.boardMember">
            <b-button @click="deleteBoardMember" variant="white" size="sm" class="mb-2">
                <b-icon icon="backspace" aria-hidden="true"></b-icon>
            </b-button>
        </span>
    </li>
</template>

<script>
import {mapState} from 'vuex'

export default {

    name: 'BoardMember',

    props: {
        member: {
            type: Object,
            required: true
        },
        owner: {
            type: String,
            required: true
        }
    },
    computed:{
    ...mapState(['me'])
    },
    data () {
        return {

    }
    },
    methods: {
        deleteBoardMember(){
            const boardMember = this.member.boardMember
            this.$emit('deleteBoardMember', boardMember);
        }
    }

}

</script>
