<template>
  <b-container fluid>
    <b-row>
      <div class="submenuimage ">
        <p class="subtitle">Q & A</p>
      </div>
    </b-row>

    <div class="container">
      <!-- 탭 -->
      <v-tabs centered color="grey darken-3">
        <v-tab to="/qnaBoard"><b>ALL</b></v-tab>
        <v-tab to="/qnaBoardfront"><b>FrontEnd</b></v-tab>
        <v-tab to="/qnaBoardback"><b>BackEnd</b></v-tab>
        <v-tabs-slider color="deep-purple lighten-5"></v-tabs-slider>
      </v-tabs>

      <!-- 서브제목 -->
      <h4 class="sub-header">질문/답변 게시판</h4>

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
            class="qnahover"
            :headers="headers"
            :items="qnaboard1"
            :search="search"
            item-key="qboardNo"
            single-line
            hide-details
          >
            <template v-slot:item="props">
              <tr @click="handleClick(props.item.qboardNo)">
                <td
                  v-if="props.item.qnaCategory.includes('프론트엔드')"
                  class="text-xs-right"
                >
                  {{ props.item.qboardNo }}
                </td>
                <td
                  v-if="props.item.qnaCategory.includes('프론트엔드')"
                  class="text-xs-right"
                >
                  {{ props.item.qnaWriter }}
                </td>
                <td
                  v-if="props.item.qnaCategory.includes('프론트엔드')"
                  class="text-xs-right"
                >
                  {{ props.item.qnaTitle }}
                  <v-icon v-if="props.item.commentCount > 0"
                    >mdi-message-text</v-icon
                  >
                </td>
                <td
                  v-if="
                    props.item.qnaAnswerYn === 'N' &&
                      props.item.qnaCategory.includes('프론트엔드')
                  "
                  class="text-xs-right"
                >
                  <v-btn class="mx-2 answerbtn1" dark small>답변대기</v-btn>
                </td>
                <td
                  v-else-if="
                    props.item.qnaAnswerYn === 'Y' &&
                      props.item.qnaCategory.includes('프론트엔드')
                  "
                  class="text-xs-right"
                >
                  <v-btn class="mx-2 answerbtn2" dark small
                    >답변 [{{ props.item.commentCount }}]</v-btn
                  >
                </td>
                <td
                  v-if="props.item.qnaCategory.includes('프론트엔드')"
                  class="text-xs-right"
                >
                  {{ formatDate(props.item.qnaDate) }}
                </td>
                <td
                  v-if="props.item.qnaCategory.includes('프론트엔드')"
                  class="text-xs-right"
                >
                  {{ props.item.boardCount }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>

        <b-row align-h="end" id="stwriterow">
          <b-button to="/qnaWrite" id="stwrite" v-if="userData.memberSq != null"
            >글쓰기</b-button
          >
        </b-row>
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
  created: function() {
    this.$store.dispatch("FETCH_QNABOARD");
  },
  computed: {
    ...mapState({
      qnaboard1: (state) => state.qnaboard1,
    }),
    ...loadUserState(["userData"]),
  },

  methods: {
    handleClick(value) {
      this.$router.replace({ name: "qnaView", params: { id: value } });
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
          value: "qboardNo", //spring vo값 !
        },
        { text: "작성자", value: "qnaWriter" },
        // { text: '분류', value: 'qnaCategory' },
        { text: "제목", value: "qnaTitle" },
        { text: "진행상태", value: "qnaAnswerYn" },
        { text: "작성일", value: "qnaDate" },
        { text: "조회수", value: "boardCount" },
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
.overflow .v-card {
  box-shadow: 0 0 black !important;
  margin-bottom: 12%;
}
.submenuimage {
  background-image: url("../../assets/images/qna.jpg");
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
#stwrite {
  background-color: #424874;
}
#stwriterow {
  margin-top: -80px;
  margin-right: 0px;
  margin-bottom: 15%;
}
.sub-header {
  color: rgb(83, 83, 83);
  margin-top: 5%;
  border-left: 15px dotted rgb(104, 104, 104);
  padding-left: 20px;
}
.answerbtn1 {
  background-color: #50b35d !important;
}
.answerbtn2 {
  background-color: #9ba4b4 !important;
}
.search-bar {
  width: 30%;
  margin-left: 72%;
}
/* hover */
.qnahover >>> tbody tr :hover {
  cursor: pointer;
}
</style>
