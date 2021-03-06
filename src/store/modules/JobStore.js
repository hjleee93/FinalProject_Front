import axios from 'axios'

var convert = require('xml-js')

const jobStore = {
    namespaced: true,
    state: {
        tableList: [
            {
                company: '', title: '', ability: '', Condition: '',
                deadline: ''
            }
        ],
        apply: '',
        items: [],
        data: [],
        jobs: [],
        jobInfo: [],
        rcmJobs: [],
        scrap: [],
        scrapcount: null
    },
    actions: {

        async rcmJob({ commit }, memberPosition) {

            await axios.get(
                "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&keyword=" +
                memberPosition.memberPosition, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset = utf-8'
                }
            }) //추천 채용정보
                .then((response) => {

                    var xml = response.data;

                    var json = convert.xml2json(xml, { compact: true });
                    this.rcmJobs = JSON.parse(json);

                    commit('SET_RCM_JOB', this.rcmJobs);
                });
        },
        async loadXml({ commit }) {
            //최신 채용 정보 xml
            await axios.get("http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=20&occupation=214200|214201|214202|214302|022|023|024|025|056",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset = utf-8'
                    }
                })
                .then((response) => {

                    let data = response.data

                    //xml to json
                    let json = convert.xml2json(data, { compact: true })
                    this.jobs = JSON.parse(json)
                    commit('SET_POST', this.jobs);

                });



        },

        //상세페이지 
        async loadJobDetail({ commit }, wantedNo) {
            await axios.get(
                "http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=D&returnType=XML&infoSvc=VALIDATION&wantedAuthNo=" +
                wantedNo.wantedNo, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset = utf-8'
                }
            })
                .then((response) => {
                    var xml = response.data;

                    var json = convert.xml2json(xml, { compact: true });
                    this.items = JSON.parse(json);

                    let receiptCloseDt = this.items.wantedDtl.wantedInfo.receiptCloseDt._text;
                    let selMthd = this.items.wantedDtl.wantedInfo.selMthd._text;
                    let rcptMthd = this.items.wantedDtl.wantedInfo.rcptMthd._text;
                    let submitDoc = this.items.wantedDtl.wantedInfo.submitDoc._text;

                    var attachFileInfo;
                    if (this.items.wantedDtl.wantedInfo.attachFileInfo == undefined) {

                        attachFileInfo = '등록된 파일이 없습니다.'
                    } else {//중복파일이 올라간 경우가있음

                        if (this.items.wantedDtl.wantedInfo.attachFileInfo.length >= 2) {
                            attachFileInfo = this.items.wantedDtl.wantedInfo.attachFileInfo[0].attachFileUrl._text;
                        }
                    }


                    this.apply =
                        { receiptCloseDt: receiptCloseDt, selMthd: selMthd, rcptMthd: rcptMthd, submitDoc: submitDoc, attachFileInfo: attachFileInfo }

                    commit('SET_GET_JOB', this.items)
                    commit('SET_GET_JOB_BOARD', this.apply)

                });

        },
        //스크랩한 구직정보 wantedNo호출
        async loadScrap({ commit }, memberSq) {

            await axios
                .get(
                    "http://rclass.iptime.org:9999/20AM_ITJOBGO_BOOT_FINAL/member/getScrapStatus?memberSq=" + memberSq.memberSq, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset = utf-8'
                    }
                })
                .then((response) => {

                    this.scrap = response.data;

                    commit('SET_SCRAP_DETAIL', this.scrap)
                })
        },
        loadJobTable({ commit }) {
            axios.get('http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=100&occupation=214200|214201|214202|214302|022|023|024|025|056',
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset = utf-8'
                    }
                })
                .then((response) => {

                    var xml = response.data
                    var json = convert.xml2json(xml, { compact: true })
                    this.jobInfo = JSON.parse(json);
                    if (this.jobInfo.wantedRoot.wanted[0] == undefined) { //결과값이 1개인 경우 
                        this.tableList = [
                            {
                                company: this.jobInfo.wantedRoot.wanted.company._text,
                                title: this.jobInfo.wantedRoot.wanted.title._text,
                                ability: this.jobInfo.wantedRoot.wanted.minEdubg._text,
                                Condition: this.jobInfo.wantedRoot.wanted.sal._text,
                                deadline: this.jobInfo.wantedRoot.wanted.closeDt._text,
                                jobNo: this.jobInfo.wantedRoot.wanted.wantedAuthNo._text,
                                career: this.jobInfo.wantedRoot.wanted.career._text,
                                region: this.jobInfo.wantedRoot.wanted.region._text,
                                holidayTpNm: this.jobInfo.wantedRoot.wanted.holidayTpNm._text
                            }]
                        commit('SET_JOB_INFO_LIST', this.tableList)
                        commit('SET_JOB_INFO', this.jobInfo)
                    }


                    const companyName = new Array();
                    if (this.jobInfo.wantedRoot.wanted != undefined && this.jobInfo.wantedRoot.wanted[0] != undefined) { //결과값이 2개 이상인 경우 

                        this.tableList = [
                            {
                                company: this.jobInfo.wantedRoot.wanted[0].company._text,
                                title: this.jobInfo.wantedRoot.wanted[0].title._text,
                                ability: this.jobInfo.wantedRoot.wanted[0].minEdubg._text,
                                Condition: this.jobInfo.wantedRoot.wanted[0].sal._text,
                                deadline: this.jobInfo.wantedRoot.wanted[0].closeDt._text,
                                jobNo: this.jobInfo.wantedRoot.wanted[0].wantedAuthNo._text,
                                career: this.jobInfo.wantedRoot.wanted[0].career._text,
                                region: this.jobInfo.wantedRoot.wanted[0].region._text,
                                holidayTpNm: this.jobInfo.wantedRoot.wanted[0].holidayTpNm._text
                            }
                        ]
                        for (let i = 1; i < this.jobInfo.wantedRoot.wanted.length; i++) {
                            companyName[i] = this.jobInfo.wantedRoot.wanted[i];

                            this.tableList.push(
                                {
                                    company: companyName[i].company._text,
                                    title: companyName[i].title._text,
                                    ability: companyName[i].minEdubg._text,
                                    Condition: companyName[i].sal._text,
                                    deadline: (companyName[i].closeDt._text),
                                    jobNo: companyName[i].wantedAuthNo._text,
                                    career: companyName[i].career._text,
                                    region: companyName[i].region._text,
                                    holidayTpNm: companyName[i].holidayTpNm._text,
                                }
                            )


                        }

                        commit('SET_JOB_INFO_LIST', this.tableList)
                        commit('SET_JOB_INFO', this.jobInfo)
                    }

                });

        },
        //서치바 결과 리턴
        async searchLoadTable({ commit }, query) {
            if (query.occupation.length === 0) { //직업 전체 선택인 경우

                query.occupation = '214200|214201|214202|214302|022|023|024|025|056'
            }
            await axios.get('http://openapi.work.go.kr/opi/opi/opia/wantedApi.do?authKey=WNKH0840HVI0HM49CADKA2VR1HJ&callTp=L&returnType=XML&startPage=1&display=100&occupation='
                + query.occupation + '&keyword=' + query.keyword + '&region=' + query.region, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset = utf-8'
                }
            })
                .then((response) => {

                    var xml = response.data
                    var json = convert.xml2json(xml, { compact: true })
                    this.jobInfo = JSON.parse(json);

                    if (this.jobInfo.wantedRoot.wanted[0] == undefined) { //결과값이 1개인 경우 
                        this.tableList = [
                            {
                                company: this.jobInfo.wantedRoot.wanted.company._text,
                                title: this.jobInfo.wantedRoot.wanted.title._text,
                                ability: this.jobInfo.wantedRoot.wanted.minEdubg._text,
                                Condition: this.jobInfo.wantedRoot.wanted.sal._text,
                                deadline: this.jobInfo.wantedRoot.wanted.closeDt._text,
                                jobNo: this.jobInfo.wantedRoot.wanted.wantedAuthNo._text,
                                career: this.jobInfo.wantedRoot.wanted.career._text,
                                region: this.jobInfo.wantedRoot.wanted.region._text,
                                holidayTpNm: this.jobInfo.wantedRoot.wanted.holidayTpNm._text
                            }]
                        commit('SET_JOB_INFO_LIST', this.tableList)
                        commit('SET_JOB_INFO', this.jobInfo)
                    }


                    const companyName = new Array();
                    if (this.jobInfo.wantedRoot.wanted != undefined && this.jobInfo.wantedRoot.wanted[0] != undefined) { //결과값이 2개 이상인 경우 
                        this.tableList = [
                            {
                                company: this.jobInfo.wantedRoot.wanted[0].company._text,
                                title: this.jobInfo.wantedRoot.wanted[0].title._text,
                                ability: this.jobInfo.wantedRoot.wanted[0].minEdubg._text,
                                Condition: this.jobInfo.wantedRoot.wanted[0].sal._text,
                                deadline: this.jobInfo.wantedRoot.wanted[0].closeDt._text,
                                jobNo: this.jobInfo.wantedRoot.wanted[0].wantedAuthNo._text,
                                career: this.jobInfo.wantedRoot.wanted[0].career._text,
                                region: this.jobInfo.wantedRoot.wanted[0].region._text,
                                holidayTpNm: this.jobInfo.wantedRoot.wanted[0].holidayTpNm._text
                            }
                        ]
                        for (let i = 1; i < this.jobInfo.wantedRoot.wanted.length; i++) {
                            companyName[i] = this.jobInfo.wantedRoot.wanted[i];

                            this.tableList.push(
                                {
                                    company: companyName[i].company._text,
                                    title: companyName[i].title._text,
                                    ability: companyName[i].minEdubg._text,
                                    Condition: companyName[i].sal._text,
                                    deadline: companyName[i].closeDt._text,
                                    jobNo: companyName[i].wantedAuthNo._text,
                                    career: this.jobInfo.wantedRoot.wanted[i].career._text,
                                    region: this.jobInfo.wantedRoot.wanted[i].region._text,
                                    holidayTpNm: this.jobInfo.wantedRoot.wanted[i].holidayTpNm._text
                                }
                            )

                        }
                    }

                    commit('SET_JOB_INFO_LIST', this.tableList)
                    commit('SET_JOB_INFO', this.jobInfo)

                });

        }


    },
    mutations: {
        SET_RCM_JOB(state, rcmJobs) {
            state.rcmJobs = rcmJobs;
        },
        SET_SCRAP_COUNT(state, scrapCount) {
            state.scrapCount = scrapCount;
        },
        SET_SCRAP_DETAIL(state, scrap) {
            state.scrap = scrap;
        },
        SET_JOB_INFO_LIST(state, tableList) {
            state.tableList = tableList;
        },
        SET_JOB_INFO(state, jobInfo) {
            state.jobInfo = jobInfo;
        },
        SET_POST(state, jobs) {
            state.jobs = jobs
        },
        SET_GET_JOB(state, items) {
            state.items = items
        },
        SET_GET_JOB_BOARD(state, apply) {
            state.apply = apply
        }
    }

}
export default jobStore