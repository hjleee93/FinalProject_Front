<template>
  <b-container class="job-info-detail">
    <div class="header-body text-center mb-7">
      <b-row class="justify-content-center">
        <b-col xl="5" lg="6" md="8" class="px-5 my-4">
          <h1 class="text-black">채용정보</h1>
        </b-col>
      </b-row>
    </div>
    <div class="info-box" v-if="items.wantedDtl != undefined">
      <table>
        <tr>
          <td style="width:60%">
            <div class="job-title m-5">
              {{ items.wantedDtl.wantedInfo.wantedTitle._text }}
              <!-- 스크랩버튼 -->
              <b-icon
                class="ml-3 scarp-star"
                id="whiteStar"
                icon="star"
                @click="scrap"
              ></b-icon>
              <b-icon
                class="ml-3 unscrap-star"
                id="fillStar"
                icon="star-fill"
                @click="unscrap"
              ></b-icon>
              <br />
              <!-- 스크랩버튼 fin -->
              <p>
                <small>{{ items.wantedDtl.corpInfo.corpNm._text }}</small>
              </p>
              <span
                class="deadline m-2 p-2"
                v-if="
                  items.wantedDtl.wantedInfo.receiptCloseDt._text !=
                    '채용시까지'
                "
                >D-{{
                  $moment(
                    $moment(
                      items.wantedDtl.wantedInfo.receiptCloseDt._text
                    ).format("YYYY-MM-DD")
                  ).diff($moment(new Date()), "days") + 1
                }}</span
              >
              <span class="deadline m-2 p-2" v-else>{{
                items.wantedDtl.wantedInfo.receiptCloseDt._text
              }}</span>
            </div>
          </td>
          <td class="text-center apply-area">
            <template v-if="apply.rcptMthd.includes('워크넷')">
              <a v-bind:href="this.$route.params.url"
                ><b-btn id="worknetApply"
                  ><p class="p-0 m-0">워크넷</p>
                  지원하기</b-btn
                ></a
              ></template
            >

            <template v-if="apply.rcptMthd.includes('이메일')">
              <a :href="`mailto:${items.wantedDtl.corpInfo.homePg._text}`">
                <b-btn id="emailApply"
                  ><p class="p-0 m-0">이메일</p>
                  지원하기</b-btn
                ></a
              >
            </template>

            <template v-if="apply.rcptMthd.includes('방문')">
              <b-btn id="directApply" href="#map">방문 지원가능</b-btn>
            </template>
          </td>
        </tr>
      </table>

      <table>
        <tr style="border-top: 1px solid #ededed">
          <td>
            <div class="qualification m-3 p-0">
              <span class="job-col font-weight-bold">지원자격</span>
              <table>
                <tr>
                  <td class="td-100">경력</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.enterTpNm._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">학력</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.eduNm._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td>
            <div class="condition m-3">
              <span class="job-col font-weight-bold">근무조건</span>
              <table>
                <tr>
                  <td class="td-100">지역</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.workRegion._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">임금</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.salTpNm._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="position m-3">
              <span class="job-col font-weight-bold">고용형태</span>
              <table>
                <tr>
                  <td class="td-100">고용형태</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.empTpNm._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">근무형태</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.workdayWorkhrCont._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
          <td>
            <div class="benefit m-3">
              <span class="job-col font-weight-bold">복리후생</span>
              <table>
                <tr>
                  <td class="td-100">연금/4대보험</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.fourIns._text }}
                  </td>
                </tr>
                <tr>
                  <td class="td-100">복리후생</td>
                  <td class="td-50">
                    {{ items.wantedDtl.wantedInfo.etcWelfare._text }}
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>
      </table>
    </div>
    <!-- 직무내용 -->
    <div v-if="items.wantedDtl != undefined">
      <p class="h3 my-5 font-weight-bold">직무내용</p>
      {{ items.wantedDtl.wantedInfo.jobCont._text }}
    </div>

    <!-- 전형방법 -->
    <div>
      <p class="h3 my-5 font-weight-bold">전형방법</p>
      <v-simple-table class="apply-table">
        <thead>
          <tr>
            <th class="text-left">
              접수마감일
            </th>
            <th class="text-left">
              전형방법
            </th>
            <th class="text-left">
              접수방법
            </th>
            <th class="text-left">
              제출 서류
            </th>
            <th class="text-left">
              제출 서류 양식
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="apply-tr">
            <td v-if="apply.receiptCloseDt == '채용시까지'">
              <b>{{ apply.receiptCloseDt }}</b>
            </td>
            <td v-else>
              <b>{{ $moment(apply.receiptCloseDt).format("YYYY-MM-DD") }}</b>
            </td>
            <td>{{ apply.selMthd }}</td>
            <td>{{ apply.rcptMthd }}</td>
            <td>{{ apply.submitDoc }}</td>
            <template v-if="apply.attachFileInfo != '등록된 파일이 없습니다.'">
              <td @mouseover="href"><a id="download">다운로드</a></td>
            </template>
            <template v-else>
              <td>{{ apply.attachFileInfo }}</td>
            </template>
          </tr>
        </tbody>
      </v-simple-table>
    </div>

    <!-- 기업정보 -->
    <p class="h3 my-5 font-weight-bold">기업정보</p>
    <table class="company-info" v-if="items.wantedDtl != undefined">
      <tr>
        <td class="company-left">
          <div>
            <div class="m-2">
              <p class="compnay-name text-center mt-5 mb-5">
                <b>{{ items.wantedDtl.corpInfo.corpNm._text }}</b>
              </p>
              <div class="text-center">
                <span>대표 : {{ items.wantedDtl.corpInfo.reperNm._text }}</span>
                <span class=" ml-3"
                  >근로자수 :
                  {{ items.wantedDtl.corpInfo.totPsncnt._text }}</span
                >
              </div>
            </div>
          </div>
        </td>
        <td class="company-right pl-3">
          <table>
            <!-- {{ items.wantedDtl.corpInfo.yrSalesAmt._text }} -->
            <tr>
              <td class="info-right pb-2 pt-2">업종</td>
              <td>{{ items.wantedDtl.corpInfo.indTpCdNm._text }}</td>
            </tr>
            <tr>
              <td class="info-right pb-2">
                주요사업
              </td>
              <td>{{ items.wantedDtl.corpInfo.busiCont._text }}</td>
            </tr>
            <tr>
              <td class="info-right pb-2">주소</td>
              <td>{{ items.wantedDtl.corpInfo.corpAddr._text }}</td>
            </tr>
            <tr>
              <template v-if="items.wantedDtl.corpInfo.homePg._text != null">
                <template
                  v-if="items.wantedDtl.corpInfo.homePg._text != 'http://'"
                >
                  <td class="info-right pb-2">
                    사이트
                  </td>

                  <td @mouseover="movePage">
                    <a id="homePage">{{
                      items.wantedDtl.corpInfo.homePg._text
                    }}</a>
                  </td>
                </template>
              </template>
              <template>
                <td></td>
              </template>
            </tr>
            <tr>
              <td
                v-if="items.wantedDtl.corpInfo.busiSize._text != null"
                class="info-right"
              >
                기업형태
              </td>
              <td>{{ items.wantedDtl.corpInfo.busiSize._text }}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- 지도 -->
    <p class="h3 my-5 font-weight-bold">찾아오는 길</p>
    <div id="map" class="mt-5" style="width:100%;height:350px;"></div>
    <!-- 워크넷출처표기 -->
    <p class="my-5 text-center">
      <a id="worknetLink" href="" @click="moveWorknet"
        ><img src="https://openapi.work.go.kr/images/btn_goEmpinfo.gif"
      /></a>
    </p>
    <p class="text-center">
      <a href="https://www.work.go.kr"
        ><img
          class="mb-3 text-center"
          src="https://openapi.work.go.kr/images/info_source.gif"
      /></a>
    </p>
  </b-container>
</template>
<script src="http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9865d6b20cfcf557f7f17640b4431305&libraries=services"></script>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("jobStore");
const { mapState: memberState } = createNamespacedHelpers("memberStore");
import $ from "jquery";
import axios from "axios";

export default {
  data: () => ({
    url: "",
  }),
  async mounted() {
    //카카오맵 라이브러리 호출
    if (window.kakao && window.kakao.maps) {
      this.kakaoMap();
    } else {
      const script = document.createElement("script");

      script.onload = () => kakao.maps.load(this.kakaoMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9865d6b20cfcf557f7f17640b4431305&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    href: function() {
      document
        .getElementById("download")
        .setAttribute("href", this.apply.attachFileInfo);
    },
    // 워크넷페이지 이동
    moveWorknet: function() {
      let worknetUrl =
        "http://www.work.go.kr/empInfo/empInfoSrch/detail/empDetailAuthView.do?callPage=detail&wantedAuthNo=" +
        this.$route.params.wantedNo;
      document.getElementById("worknetLink").setAttribute("href", worknetUrl);
    },
    //해당 홈페이지로 이동
    movePage: function() {
      if (
        this.items.wantedDtl.corpInfo.homePg._text.includes("http") == false
      ) {
        var url = "https://" + this.items.wantedDtl.corpInfo.homePg._text;
      } else {
        url = this.items.wantedDtl.corpInfo.homePg._text;
      }
      document.getElementById("homePage").setAttribute("href", url);
    },

    scrap: function() {
      const formData = {
        memberSq: this.userData.memberSq,
        jobNo: this.$route.params.wantedNo,
        jobTitle: this.items.wantedDtl.wantedInfo.wantedTitle._text,
        company: this.items.wantedDtl.corpInfo.corpNm._text,
        deadline: this.items.wantedDtl.wantedInfo.receiptCloseDt._text,
        applyMethod: this.items.wantedDtl.wantedInfo.rcptMthd._text,
      };
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/scrapJob",
          formData
        ) //form server 연결
        .then((res) => {
          if (res.data > 0) {
            this.$swal({
              text: "스크랩된 구직정보는 마이페이지에서 확인 가능합니다.",
              icon: "success",
            });
          } else {
            this.$swal({
              text: "스크랩에 실패하였습니다. 관리자에게 문의해주세요",
              icon: "error",
            });
          }
        })
        .catch(() => {
          this.$swal({
            text: "스크랩에 실패하였습니다. 관리자에게 문의해주세요",
            icon: "error",
          });
        });

      $("#whiteStar").hide();
      $("#fillStar").show();
    },
    unscrap: function() {
      const formData = {
        memberSq: this.userData.memberSq,
        jobNo: this.$route.params.wantedNo,
      };
      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/unscrapJob",
          formData
        ) //form server 연결
        .then((res) => {
          if (res.data > 0) {
          } else {
            this.$swal({
              text: "스크랩에 제거에 실패하였습니다. 관리자에게 문의해주세요",
              icon: "error",
            });
          }
        })
        .catch(() => {
          this.$swal({
            text: "스크랩에 제거에 실패하였습니다. 관리자에게 문의해주세요",
            icon: "error",
          });
        });
      $("#whiteStar").show();
      $("#fillStar").hide();
    },
    // 카카오지도
    async kakaoMap() {
      setTimeout(() => {
        if (this.items.wantedDtl != undefined) {
          var temp = this.items.wantedDtl.corpInfo.corpAddr._text;
          var add = temp.substr(6, temp.length);

          var cn = this.items.wantedDtl.corpInfo.corpNm._text;
          var mapContainer = document.getElementById("map"), // 지도를 표시할 div
            mapOption = {
              center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
              level: 3, // 지도의 확대 레벨
            };
          var map = new kakao.maps.Map(mapContainer, mapOption);
          var geocoder = new kakao.maps.services.Geocoder();

          // 주소로 좌표를 검색합니다
          geocoder.addressSearch(add, function(result, status) {
            // 정상적으로 검색이 완료됐으면
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

              // 결과값으로 받은 위치를 마커로 표시합니다
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords,
              });

              // 인포윈도우로 장소에 대한 설명을 표시합니다
              var infowindow = new kakao.maps.InfoWindow({
                content:
                  '<div style="width:150px;text-align:center;padding:6px 0;"><a href="https://map.kakao.com/link/search/' +
                  cn +
                  '">' +
                  cn +
                  "</div>",
              });
              infowindow.open(map, marker);

              // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
              map.setCenter(coords);
            }
          });
        }
      }, 500);
    },
  },
  computed: {
    ...memberState(["userData"]),
    ...mapState([
      //매핑값

      "apply",
      "items",
    ]),
  },
  async created() {
    await this.$store.dispatch("memberStore/getMemberInfo");
    await this.$store.dispatch("jobStore/loadJobDetail", {
      wantedNo: this.$route.params.wantedNo,
      url: this.$route.params.url,
    });
    await axios
      .get(
        "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/getScrapStatus?memberSq=" +
          this.userData.memberSq
      )
      .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
          if (this.$route.params.wantedNo == response.data[i].jobNo) {
            $("#whiteStar").hide();
            $("#fillStar").show();
          }
        }
      });
  },
};
</script>

<style scoped>
.job-info-detail {
  font-family: "Noto Sans KR", sans-serif;
}
/* 지원버튼 */
.apply-area {
  width: 445px;
}
#directApply {
  padding-top: 30px;
}
#worknetApply,
#emailApply,
#directApply {
  border: 0px;
  height: 85px;
  margin-right: 10px;
  width: 130px;
  margin-bottom: 5px;
}

#emailApply {
  background-color: #40a1d2;
}

#directApply {
  background-color: #6076d7;
}

#worknetApply {
  background-color: #40d29a;
}
/* 기업정보 */
.compnay-name {
  height: 70%;
}
.company-left {
  width: 40%;
}
.company-right {
  width: 60%;
}

.info-right {
  width: 30%;
}
.info-right + td {
  width: 70%;
}

.company-info {
  width: inherit;
  height: 200px;
  border: 1px solid #ededed;
}

/* 전형방법 */
.text-left {
  font-size: 15px !important;
}
.apply-tr:hover {
  background-color: white !important;
}
#download,
#download:hover,
#homePage,
#homePage:hover {
  color: #0286ce;
}

.deadline {
  color: white;
  font-size: 15px;
  border-radius: 5px;
  background-color: #a6b1e1;
}
.job-col {
  padding-bottom: 5px;
  border-bottom: 2px solid;
}
/* 상단박스 */

#fillStar {
  display: none;
  color: #b8e072;
}
.scarp-star {
  color: #b8e072;
}
.scarp-star:hover,
#fillStar:hover {
  cursor: pointer;
}
.info-box {
  border: 1px solid #ededed;
}
.td-100 {
  width: 100px;
}
.td-50 {
  height: 50px;
}
.qualification,
.position,
.benefit,
.condition {
  height: 40%;
  display: inline-block;
}
.left {
  height: 500px;
  float: left;
  width: 780px;
  padding: 30px;
  border-right: 1px solid #ededed;
}
.right {
  height: 500px;
  float: right;
  width: calc(100% - 780px);
  padding: 19px 30px 0 30px;
}
.job-title {
  line-height: 1.5;
  font-size: 1.5174em;
  font-weight: 700;
}
.cell {
  width: 50%;
}
</style>
