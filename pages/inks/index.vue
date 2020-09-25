<template>
  <div class="main">
    <ul>
      <li v-for="ink in inks" :key="ink.id">
        <p v-if="check !== ink.id">
          {{ink.ink_name}} price:{{ ink.ink_price }}
          <b-button variant="outline-primary" @click="edit(ink.id)">Edit ink</b-button>
          <b-button variant="outline-primary" @click="deleteInk(ink.id , ink.ink_name)">Delete ink</b-button>
        </p>
        <p v-else>
          name:<b-form-input v-model="ink.ink_name" placeholder="name"></b-form-input>
          price:<b-form-input v-model="ink.ink_price" placeholder="price"></b-form-input>
          <b-button variant="outline-primary" @click="save(ink.id,ink.ink_name,ink.ink_price)">save</b-button>
          <b-button variant="outline-primary" @click="cancelEdit()">cancel</b-button>
        </p>

      </li>
    </ul>
    <b-button variant="outline-primary" @click="addInk()">Add ink</b-button>
    <div v-if="checkAddInk !== false">
      <b-form-input placeholder="ink name"
       v-model="inkName"></b-form-input>
       <b-form-input placeholder="price"
       v-model="price"></b-form-input>
       <b-button variant="outline-primary" @click="add()">add</b-button>
       <b-button variant="outline-primary" @click="cancel()">cancel</b-button>
    </div>

    <div>
      <b-table striped hover :items="inks" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        fields: ['ink_name', 'ink_price'],
        inks: [],
        inkName:"",
        price:0,
        check:0,
        checkAddInk:false,
      }
    },
    async created() {
      console.log('created')
      this.getInks()

    },
    methods: {
      async getInks() {
          let res = await this.$http.get('/inks')
          this.inks = res.data.data
          console.log("data" ,this.inks)
      },
      addInk(){
        this.checkAddInk=1
      },
      deleteInk(id,name){
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
              this.$http.delete(`inks/${id}/delete`)
              this.getInks()
            }else{

            }

          })
          .catch(err => {
            // An error occurred
          })
      },
      async add(){
        let res = await this.$http.post('/inks/create', {
                name: this.inkName,
                price: this.price,
            })
        this.checkAddInk = false
        this.inkName=""
        this.price=0
        this.getInks()
      },
      cancel(){
        this.checkAddInk = false
      },
      cancelEdit(){
        this.check = 0
      },
      edit(id){
          this.check = id
      },
      save(id,name,price){
        this.$http.put(`/inks/update/${id}`,{
                id: `${id}`,
                ink_name: name,
                ink_price:price
            }).then(value =>{
                if(value){
                    this.check = false
                }
            })
      },
    }
  }
</script>
