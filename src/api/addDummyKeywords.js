let keywords = [
"#모험적",
"#이불안이안전해",
"#이불밖이재밌어",
"#영화",
"#여행",
"#일상",
"#아이돌",
"#음악",
"#독서",
"#맛집투어",
"#커피",
"#그림",
"#만화",
"#애니메이션",
"#유튜브",
"#PC게임",
"#모바일게임",
"#화장품",
"#패션",
"#소주",
"#맥주",
"#애연가",
"#애주가",
"#사진찍기",
"#개",
"#고양이",
"#특이한동물",
"#다이어트",
]


const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'

const apiUrl = "http://localhost:3000/graphql";

let post = (query) => {
  return axios.post(apiUrl, {query}, {timeout: 1000});
}

let get = (query) => {
  return axios.get(apiUrl + "?query=" + query);
}

for (let i = 0; i < keywords.length; i++) {
  let query = `mutation {
    createKeyword(keyword: "${keywords[i]}", isDefaultKeyword: true) {
      id
      keyword
      isDefaultKeyword
    }
  }
   `
  post(query).then(r => {
    console.log(r)
  })
    .catch(e => console.log(e.response.data.errors[0]))

}


