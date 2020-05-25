<template>
  <div id="app">
    <!-- message to the world -->
    <div id="planetAPP">
      <div class="logoCapsule">
        <img src="../src/assets/vue-planet.png" alt="">
        <h2>Vue <br> Gezegenine Yolculuk</h2>
      </div>

      <div class="firstMission mission">
        <h2 class="missionNumb">1. Görev</h2>
        <div class="messageWorld">
          <textarea v-model="message"></textarea>
          <p class="fromMessage">Evan</p>
          <button v-on:click="messageSend">Gönder</button>
          <p class="messageStatus">{{ messageStatus }}</p>
          <p class="messageInfo"> {{ from }} <br> {{ messageContent }}</p>
          <p class="messageTime">{{ time }}</p>
        </div>
      </div>
    </div>
    <!-- message to the world -->

    <hr>

    <!-- open the door -->

    <div id="planetApp2">
      <h2 class="missionNumb">2. Görev</h2>

      <div class="progressBar" id="progressBar">
        <div class="progress" :style="progressWidth"></div>
      </div>

      <div class="stage">% {{ load }}</div>
      <div class="status">{{ status }}</div>

      <button class="btn decrase" @click="decrase">Süreci Bitir</button>
      <button class="btn increase" @click="increase">Süreci Başlat</button>

    </div>

    <!-- let's explore  -->
    <hr>

    <h2 class="missionNumb">4. Görev</h2>

    <div class="container teamsContainer">
      <team-a></team-a>
      <team-b></team-b>
      <ship class="ship"></ship>
    </div>

    <!-- let's explore  -->
  </div>
</template>

<script>
  

  export default {
    data: function () {
      return {
        message: '',
        from: '',
        messageStatus: '',
        messageContent: '',
        time: '',
        load: 0,
        progressWidth: '',
        processingIncrease: '',
        processingDecrease: '',
        status: 'Aktif bir işlem bulunmuyor.',
      }
    },
    methods: {
      messageSend: function () {
        this.messageStatus = 'Mesaj gönderiliyor..';
        var planetAPP = this;

        setTimeout(function () {
          planetAPP.messageStatus = 'Mesajınız başarıyla gönderildi.';
          planetAPP.from = 'Gönderen: Evan';
          planetAPP.messageContent = planetAPP.message;
          planetAPP.time = new Date().toLocaleString();
        }, 2000);
      },
      decrase: function () {
        clearInterval(this.processingIncrease);
        var vm = this;
        this.processingDecrease = setInterval(function () {
          if (vm.load > 0) {
            vm.status = 'İşlem iptal ediliyor...';
            vm.load -= 5;
          } else {
            vm.load = 0;
            vm.status = 'Kapılar kapatıldı.';
          }
        }, 500);
      },
      increase: function () {
        clearInterval(this.processingDecrease);
        var vm = this;
        this.processingIncrease = setInterval(function () {
          if (vm.load < 100) {
            vm.status = 'İşlem tamamlanıyor...';
            vm.load += 5;
          } else {
            vm.status = 'Kapılar açıldı.';
            vm.load = 100;
          }
        }, 1000);
      }
    },
    watch: {
      load: function () {
        this.progressWidth = 'width: ' + this.load + '%';
      }
    }
  };

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    color: #273849;
    font-weight: bold;
  }

  .logoCapsule {
    width: 100%;
  }

  .logoCapsule img {
    width: 35%;
  }

  .logoCapsule h2 {
    font-size: 250%;
    margin: 2% 0 0 1%;
  }

  .logoCapsule * {
    display: block;
    margin: auto;
    text-align: center;
  }

  .mission {
    margin-top: 5%;
  }

  .missionNumb {
    border-bottom: 1px solid #273849;
    padding: 1%;
    margin: 1%;
  }

  /*message to the world*/

  .messageWorld textarea {
    width: 40%;
    height: 60px;
    display: block;
    margin: 0 0 1% 10%;
    border: 1px solid #273849;
    resize: none;
  }

  .messageWorld .fromMessage {
    display: inline;
    margin-left: 45%;
  }

  .messageStatus,
  .messageInfo,
  .messageTime {
    margin-left: 10%;
  }

  /*message to the world*/

  /*progress bar*/

  .progressBar {
    width: 75%;
    height: 30px;
    border: 2px solid #354c63;
    margin: 50px auto;
    border-radius: 20px;
    overflow: hidden;
  }

  .progress {
    width: 0;
    height: 30px;
    background-color: #41b883;
  }

  .stage,
  .status {
    width: 100px;
    margin: auto;
    font-size: 30px;
    color: #354c63;
    text-align: center;
  }

  .status {
    width: 350px;
  }

  .btn {
    width: 150px;
    margin: auto;
    position: relative;
    top: 50px;
    border-radius: 4px;
    background-color: #354c63;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 22px;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 100px;
  }

  .decrase {
    left: 40%;
  }

  .increase {
    left: 45%;
  }

  /*Team */

  .teamsContainer{
    width: 50%;
    margin-bottom: 400px;
  }

  .teamsContainer .ship{
    position: relative;
    top: 12px;

  }

  /*Team */

</style>
