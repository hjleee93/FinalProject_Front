<template>
  <b-container>
    <div class="container" id="header-container">
      <h2 class="st_title">Information 수정</h2>
      <hr />
    </div>

    <form
      role="form"
      @submit.prevent="updateForm"
      enctype="multipart/form-data"
    >
      <b-input-group prepend="기업" class="mb-2">
        <b-form-input
          id="input-1"
          name="infoTitle"
          placeholder="기업명을 작성하세요"
          v-model="infoDetail.infoTitle"
          required
        ></b-form-input>
      </b-input-group>

      <b-input-group prepend="분류" class="mb-2">
        <b-form-select
          id="input-2"
          v-model="category"
          :options="infoCategory"
          required
        ></b-form-select>
      </b-input-group>

      <b-input-group prepend="날짜" class="mb-2">
        <b-form-datepicker
          label="날짜"
          :date-format-options="{
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          }"
          :min="min"
          name="infoDate"
          v-model="infoDetail.infoDate"
          required
        ></b-form-datepicker>
      </b-input-group>

      <b-input-group prepend="시간" class="mb-2">
        <b-form-input
          label="시간"
          type="time"
          v-model="infoDetail.infoTime"
          required
        ></b-form-input>
      </b-input-group>

      <b-form-group id="input-group-3" label-for="input-3">
        <b-form-textarea
          id="textarea-content"
          v-model="infoDetail.infoContent"
          name="infoContent"
          placeholder=" 주소 또는 내용을 작성하세요"
          rows="7"
          required
        ></b-form-textarea>
      </b-form-group>

      <b-form-group>
        <b-form-file
          id="files"
          ref="upfiles"
          v-on:change="handleFile"
          :placeholder="infoAttachment.originalfilename"
        >
        </b-form-file>
      </b-form-group>

      <!--첨부파일 리셋 버튼-->
      <!--  <b-button @click="clearFiles" id="file_btn" class="mr-2">Clear files</b-button> -->
      <!-- 수정 버튼 -->
      <div id="btn_bottom">
        <b-button id="submit1" type="submit">완료</b-button>
        <!--   <b-button type="reset"  id="reset-btn">Reset</b-button> -->
        <b-button type="button" id="golist" to="/infoList" exact>목록</b-button>
      </div>
    </form>
  </b-container>
</template>

<script>
/* import { VueEditor } from "vue2-editor"; */
import { mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);

    return {
      infoTitle: "",
      category: null,
      infoCategory: [
        { value: null, text: "분류를 선택하세요" },
        { value: "설명회", text: "설명회" },
        { value: "박람회", text: "박람회" },
        { value: "상담회", text: "상담회" },
      ],
      infoDate: "",
      infoTime: "",
      infoContent: "",
      files: "",
      min: minDate,
    };
  },
  created() {
    const infoSq = this.$route.params.id;
    this.$store.dispatch("FETCH_INFO_UPDATE", infoSq);
  },
  computed: {
    //mapState를 통해서 store에 저장된 객체를 가져온다
    ...mapState({
      infoDetail: (state) => state.infoDetail,
      infoAttachment: (state) => state.infoAttachment,
    }),
  },
  components: {
    /*     VueEditor, */
  },

  methods: {
    updateForm() {
      if (!this.infoTitle) {
        this.infoTitle = this.infoDetail.infoTitle;
      }
      if (!this.infocategory) {
        this.infocategory = this.infoDetail.infocategory;
      }
      if (!this.infoDate) {
        this.infoDate = this.infoDetail.infoDate;
      }
      if (!this.infoTime) {
        this.infoTime = this.infoDetail.infoTime;
      }
      if (!this.infoContent) {
        this.infoContent = this.infoDetail.infoContent;
      }
      if (!this.files) {
        this.files = this.infoAttachment.renamedfilename;
      }

      let formData = new FormData();
      formData.append("infoTitle", this.infoTitle);
      formData.append("infoCategory", this.category);
      formData.append("infoDate", this.infoDate);
      formData.append("infoTime", this.infoTime);
      formData.append(
        "infoContent",
        this.infoContent.replace(/(<([^>]+)>)/gi, "")
      );
      formData.append("file", this.files);
      formData.append("infoSq", this.$route.params.id);

      for (let key of formData.entries()) {
        console.log(`${key}`);
      }

      axios
        .post(
          "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/info/infoUpdateEnd",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
      console.log(formData);
      //등록하면 게시판 목록으로
      this.$router.replace({ name: "InfoList" });
    },
    handleFile() {
      console.log(this.$refs.upfiles.$refs.input.files[0]);
      this.files = this.$refs.upfiles.$refs.input.files[0];
      console.log(this.files);
    },
  },
};
</script>

<style>
.st_title {
  margin-top: 5%;
  margin-bottom: 3%;
}
.btn_sr {
  margin-top: 0%;
  position: absolute;
  left: 44%;
}
.btn-space {
  margin-right: 15px;
}
#submit1 {
  width: 60px;
  margin-bottom: 5px;
  margin-right: 2%;
  background-color: #424874;
  border: 1px;
  color: white;
}
#golist {
  width: 60px;
  margin-bottom: 5px;
  margin-right: 2%;
  background-color: #9ba4b4;
  border: 5px;
  color: white;
}
#reset-btn {
  width: 60px;
  margin-bottom: 5px;
  margin-right: 2%;
  background-color: #9ba4b4;
  border: 5px;
  color: white;
}
#btn_bottom {
  margin: 2%;
  text-align: center;
}
</style>
