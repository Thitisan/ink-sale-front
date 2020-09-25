<template>
  <div>
    <div>
      <b-table striped hover :items="bills" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        bills: [],
        fields: ['customer_name', 'seller_name','ink_name','ink_price','amount'],
        check:0,
        checkAdd:false,
      }
    },
    async created() {
      console.log('created')
      this.getBills()

    },
    methods: {
      async getBills() {
          let res = await this.$http.get('/bills')
          this.bills = res.data.data
          console.log("data" ,this.bills)
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
      async add(name,address,phone){
        let res = await this.$http.post('/customers/create', {
                name:name,
                address:address,
                phone:phone,
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

<style>

</style>
