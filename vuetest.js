const BASE_URL = "https://ghibliapi.herokuapp.com/"

Vue.component('listitem', {
  props: ['licontent'],
  template:'<li>{{licontent.title}}</li>'
})

Vue.component('searchresults',{
  props:['moviesearch', 'param'],
  data:function(){
    return {
      clicked:false,
      // data for which param

    }
  },
  methods:{
    displayall:function(){
      this.clicked = !this.clicked
    },


  },
  template:`<li v-if="!clicked" v-on:click="displayall">{{moviesearch[param]}}</li>
            <li v-else v-on:click="displayall">
              <table>
                <tr v-for="(key, value) in moviesearch">
                  <td>{{value}}</td>
                  <td>{{key}}</td>
                </tr>
              </table>
             </li>
             `
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    todos: [
      // { text: 'Learn JavaScript' },
      // { text: 'Learn Vue' },
      // { text: 'Build something awesome' }
      'princess',
      'and',
      'the',
      'frog',
    ]
  },
  methods:{
    reverse: function(){
      this.message = this.message.split('').reverse().join('')
    }
  }
})


var apiapp = new Vue({
  el:'#api-app',
  data:{
    ghibli:null,
    searchresults:[],
    searchstring:'',
    searchparam:"title",
  },

  created:function(){
    axios
      .get(BASE_URL + "films")
      .then(response => this.ghibli = response.data)
  },
  methods:{
    searchbypeople:function(){
      axios
        .get(BASE_URL + "people")
        .then(response => this.ghibli = response.data)

      this.searchparam = "name"
    },
    searchbytitle:function(){
      axios
        .get(BASE_URL + "films")
        .then(response => this.ghibli = response.data)

      this.searchparam = "title"
    },
    showpossibleresults:function(){
      // var arr = []
      var sr = []
      let ss = this.searchstring.toLowerCase()
      // console.log(this.searchstring);
      let param = this.searchparam
      this.ghibli.forEach(function(x){
        // console.log(x.title.toLowerCase())

        if(x[param].toLowerCase().includes(ss)){
          // console.log(x['title'], param)
          sr.push(x)
        }
      })
      // console.log(arr)
      this.searchresults = sr;

    },
    showpeopleresults:function(){
      // var arr = []
      var sr = []
      let ss = this.searchstring.toLowerCase()
      // console.log(this.searchstring);
      this.ghibli.forEach(function(x){
        // console.log(x.title.toLowerCase())
        if(x.name.toLowerCase().includes(ss)){
          // console.log(x.title
          sr.push(x)
        }
      })
      // console.log(arr)
      this.searchresults = sr;

    },
  }

})



// var vm = new Vue({
//   // options
//
// })

// fetch("https://ghibliapi.herokuapp.com/films")
//   .then(function(response){
//     if(response.ok){
//       return response.json()
//     }
//
//   })
//
//   .then(function(data){
//     console.log(data);
//   })

// const response = await fetch("https://ghibliapi.herokuapp.com/films");
// const jsonified = await response.json();
//
// console.log(JSON.stringify(jsonified));
