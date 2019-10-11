<template>
  <div>
    <nav class="navbar orange lighten-1">
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" v-on:click.prevent="clickhamburger">
            <i class="material-icons black-text">dehaze</i>
          </a>
          <span class="black-text">{{timeNow | date}}</span>
        </div>

        <ul class="right hide-on-small-and-down">
          <li>
            <a class="dropdown-trigger black-text" href="#" data-target="dropdown" ref="dropdown">USER NAME
              <i class="material-icons right">arrow_drop_down</i>
            </a>

            <ul id='dropdown' class='dropdown-content'>
              <li>
                <router-link to="/profile" class="black-text">
                  <i class="material-icons">account_circle</i>Профиль
                </router-link>
              </li>
              <li class="divider" tabindex="-1"></li>
              <li>
                <a v-on:click.prevent="logout" class="black-text">
                  <i class="material-icons">assignment_return</i>Выйти
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>

  </div>
</template>

<script>
    export default {
        name: "navbar",
        data: function (){
            return {
                timeNow: new Date(),
            }
        },
        methods:{
            clickhamburger(){
                this.$emit('clickedhamburger');
            },
            logout(){
                console.log('LOGOUT');
                this.$router.push('/login?message=logout')
            }
        },

        mounted() {
            setInterval(() =>{
                this.timeNow = new Date();
            }, 1000);
            M.Dropdown.init(this.$refs.dropdown,{
                constrainWidth: false,
                coverTrigger: false
            })
        }
    }
</script>

<style scoped lang="stylus">

</style>
