<template>
  <b-container fluid>
    <!-- 메인 이미지 -->
    <b-row>
      <div class="submenuimage">
        <p class="subtitle">Reference</p>
      </div>
    </b-row>

    <div class="container">
      <!-- 탭 -->
      <v-tabs centered color="grey darken-3" id="tab_font">
        <v-tab to="/refSite"><b>ALL</b></v-tab>
        <v-tab to="/refSitefront"><b>FrontEnd</b></v-tab>
        <v-tab to="/refSiteback"><b>BackEnd</b></v-tab>
        <v-tab to="/refSiteEtc"><b>ETC 기타</b></v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>

      <!-- 서브제목 -->
      <h4 class="sub-header">미승인 대기 리스트</h4>

      <div class="overflow">
        <!-- 테이블 -->
        <v-card>
          <v-card-title class="search-bar">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="refListNo"
            :search="search"
            item-key="refNo"
            single-line
            hide-details
          >
            <template v-slot:item="props">
              <tr @click="handleClick(props.item.refNo)">
                <!-- <td v-if="props.item.status.includes('N')" class="text-xs-right">{{props.item.refNo}}</td>  -->
                <td class="text-xs-right">{{ props.item.refNo }}</td>
                <td class="text-xs-right">{{ props.item.refCategory }}</td>
                <td class="text-xs-right">
                  {{ props.item.refTitle }} _ {{ props.item.refSiteAddr }}
                </td>
                <td class="text-xs-right">
                  <v-btn class="mx-2 answerbtn3" dark small>승인대기</v-btn>
                </td>
                <td class="text-xs-right">
                  {{ formatDate(props.item.qnaDate) }}
                </td>
              </tr>
            </template>
            <!-- <td v-if="props.item.deadline.includes('채용시까지')"> -->
          </v-data-table>
        </v-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import Vue from "vue";
import vueMoment from "vue-moment";
Vue.use(vueMoment);
const { mapState: loadUserState } = createNamespacedHelpers("memberStore");
import { createNamespacedHelpers } from "vuex";

export default {
  created() {
    this.$store.dispatch("FECH_REF_LIST_NO");
  },
  computed: {
    ...mapState({
      refListNo: (state) => state.refListNo,
    }),
    ...loadUserState(["userData"]),
  },

  methods: {
    handleClick(value) {
      this.$router.replace({ name: "refSiteView", params: { id: value } });
    },

    formatDate(value) {
      return this.$moment(value).format("YYYY-MM-DD");
    },
  },

  data() {
    return {
      search: "",
      headers: [
        {
          text: "NO",
          align: "start",
          filterable: false,
          value: "refNo", //spring vo값 !
        },
        { text: "분류", value: "refCategory" },
        { text: "사이트 명", value: "refTitle" },
        // { text: '내용', value: 'refContent' },
        { text: "승인여부", value: "status" },
        { text: "작성일", value: "refDate" },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:ital,wght@1,600&display=swap");

* {
  font-family: "Noto Sans KR", sans-serif;
}
.submenuimage {
  background-image: url("../../assets/images/refimg.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  opacity: 0.7;
  height: 180px;
  background-color: #f4eeff;
  text-align: center;
  line-height: 180px;
}
.subtitle {
  font-weight: 700;
  color: #fff;
  text-shadow: 2px 2px #4e515763;
  font-size: 50px;
}
#tab_font {
  margin-bottom: 5%;
}
.overflow .v-card {
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
.site_ect {
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 50px;
  margin-top: 20px;
}
.st_search {
  position: absolute;
  left: 67%;
}
.sub-header {
  color: rgb(83, 83, 83);
  margin-top: 6%;
  border-left: 15px dotted rgb(104, 104, 104);
  padding-left: 20px;
}
#st_write_ref {
  left: 990px;
  position: relative;
  top: 5px;
  background-color: #424874;
  border: none;
  color: white;
}
#searchbtn {
  background-color: #9ba4b4;
  border: 1px #9ba4b4 solid;
}
.search-align {
  margin-top: 2%;
  margin-bottom: 12%;
}
#title {
  text-align: center;
  margin-top: 2%;
  margin-bottom: 5%;
  font-size: 19px;
  color: #424874;
}
#date {
  color: #9ba4b4;
  /* margin-top: 6%; */
  font-size: 14px;
  margin-left: 20px;
}
.mx-auto {
  margin: 1.5%;
}
.btn_site {
  border: 1px #3a74df solid;
  margin-bottom: 3%;
  margin-top: 2%;
  margin-left: 4%;
}
.answerbtn3 {
  background-color: #777a7e !important;
}
.search-bar {
  width: 30%;
  margin-left: 72%;
}
</style>
