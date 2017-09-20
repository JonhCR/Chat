<template>
    <div>
        <li style="width: fit-content;" class="list-group-item" :class="className">
            <slot></slot>
            <span style="font-weight:bolder; color: black;margin-top: 10px;font-size: 10px;float: right;">&nbsp;&nbsp;{{time}}</span>
        </li>
        <small class="badge float-right" :class="badgeClass">{{user}}</small>
    </div>
</template>

<script>
    export default {

        props : [
            'color' , 'user' , 'time'
        ],

        computed : {
            className(){
                return "list-group-item-" + this.color;
            },
            badgeClass(){
                return "badge-" + this.color;
            }
        },

        mounted() {
            //console.log('El componente <message></message> fue montado!')
        }
    }
</script>