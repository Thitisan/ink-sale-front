<template>
  <div class="main">
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        <p v-if="check !== customer.id">
          {{customer.customer_name}} address:{{ customer.customer_address }} phone:{{customer.customer_phone}}
          <b-button variant="outline-primary" @click="edit(customer.id)">Edit ink</b-button>
          <b-button variant="outline-primary" @click="deleteCustomer(customer.id , customer.customer_name)">Delete customer</b-button>
        </p>
        <p v-else>
          name:<b-form-input v-model="customer.customer_name" placeholder="name"></b-form-input>
          Address:<b-form-input v-model="customer.customer_address" placeholder="address"></b-form-input>
          phone:<b-form-input v-model="customer.customer_phone" placeholder="phone"></b-form-input>
          <b-button variant="outline-primary" @click="save(customer.id,customer.customer_name,customer.customer_address,customer.customer_phone)">save</b-button>
          <b-button variant="outline-primary" @click="cancelEdit()">cancel</b-button>
        </p>

      </li>
    </ul>
    <b-button variant="outline-primary" @click="addCustomer()">Add customer</b-button>
    <div v-if="checkAdd !== false">
      name:<b-form-input v-model="customerName" placeholder="name"></b-form-input>
      Address:<b-form-input v-model="customerAddress" placeholder="address"></b-form-input>
      phone:<b-form-input v-model="customerPhone" placeholder="phone"></b-form-input>
      <b-button variant="outline-primary" @click="add()">add</b-button>
      <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        customers: [],
        customerName:"",
        customerAddress:"",
        customerPhone:"",
        check:0,
        checkAdd:false,
      }
    },
    async created() {
      console.log('created')
      this.getCustomer()

    },
    methods: {
      async getCustomer() {
          let res = await this.$http.get('/customers')
          this.customers = res.data.data
          console.log("data" ,this.customers)
      },
      addCustomer(){
        this.checkAdd=1
      },
      deleteCustomer(id,name){
        this.$bvModal.msgBoxConfirm(`Please confirm that you want to delete ${name}`, {
          title: 'Please Confirm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if(value){
              this.$http.delete(`customers/${id}/delete`)
              this.getCustomer()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
      },
      async add(){
        let res = await this.$http.post('/customers/create', {
                name:this.customerName,
                address:this.customerAddress,
                phone:this.customerPhone,
            })
        this.checkAdd = false
        this.getCustomer()
      },
      cancel(){
        this.checkAdd = false
      },
      cancelEdit(){
        this.check = 0
      },
      edit(id){
          this.check = id
      },
      save(id,name,nick_name,phone){
        this.$http.put(`/customers/update/${id}`,{
                id: `${id}`,
                name:name,
                address:address,
                phone:phone
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
      },
    }
  }
</script>
