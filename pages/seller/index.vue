<template>
  <div class="main">
    <ul>
      <li v-for="seller in sellers" :key="seller.id">
        <p v-if="check !== seller.id">
          {{seller.name}} nick name:{{ seller.nick_name }} phone:{{seller.phone}} email:{{seller.email}}
          <b-button variant="outline-primary" @click="edit(seller.id)">Edit ink</b-button>
          <b-button variant="outline-primary" @click="deletesellers(seller.id , seller.name)">Delete ink</b-button>
        </p>
        <p v-else>
          name:<b-form-input v-model="seller.name" placeholder="name"></b-form-input>
          nick name:<b-form-input v-model="seller.nick_name" placeholder="nick name"></b-form-input>
          phone:<b-form-input v-model="seller.phone" placeholder="phone"></b-form-input>
          email:<b-form-input v-model="seller.email" placeholder="email"></b-form-input>
          <b-button variant="outline-primary" @click="save(seller.id,seller.name,seller.nick_name,seller.phone,seller.email)">save</b-button>
          <b-button variant="outline-primary" @click="cancelEdit()">cancel</b-button>
        </p>

      </li>
    </ul>
    <b-button variant="outline-primary" @click="addSeller()">Add seller</b-button>
    <div v-if="checkAdd !== false">
      name:<b-form-input v-model="sellerName" placeholder="name"></b-form-input>
      nick name:<b-form-input v-model="sellerNickName" placeholder="nick name"></b-form-input>
      phone:<b-form-input v-model="sellerPhone" placeholder="phone"></b-form-input>
      email:<b-form-input v-model="sellerEmail" placeholder="email"></b-form-input>
      <b-button variant="outline-primary" @click="add(sellerName,sellerNickName,sellerPhone,sellerEmail)">add</b-button>
      <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sellers: [],
        sellerName:"",
        sellerNickName:"",
        sellerPhone:"",
        sellerEmail:"",
        check:0,
        checkAdd:false,
      }
    },
    async created() {
      console.log('created')
      this.getsellers()

    },
    methods: {
      async getsellers() {
          let res = await this.$http.get('/sellers')
          this.sellers = res.data.data
          console.log("data" ,this.sellers)
      },
      addSeller(){
        this.checkAdd=1
      },
      deletesellers(id,name){
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
              this.$http.delete(`sellers/${id}/delete`)
              this.getsellers()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
      },
      async add(name,nick_name,phone,email){
        let res = await this.$http.post('/sellers/create', {
                name:name,
                nick_name:nick_name,
                phone:phone,
                email:email,
            })
        this.checkAdd = false
        this.getsellers()
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
      save(id,name,nick_name,phone,email){
        this.$http.put(`/sellers/update/${id}`,{
                id: `${id}`,
                name:name,
                nick_name:nick_name,
                phone:phone,
                email:email,
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
      },
    }
  }
</script>
