const express = require('express');
const router = express.Router();

const libKakaoWork = require('../libs/kakaoWork');
const db = require('../db');

/*-------------------------------------------------------------------------------*/
// TEST - 한영규
/*router.get('/', async (req, res, next) => {
	
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messages = await Promise.all([
    conversations.map((conversation) =>
      libKakaoWork.sendMessage({
        conversationId: conversation.id,
        "text": "Push alarm message",
		  "blocks": [
			{
			  "type": "header",
			  "text": "안녕하세요. 28조 챗봇 입니다.",
			  "style": "blue"
			},
			{
			  "type": "text",
			  "text": "아래의 3가지 기능을 \n사용할 수 있습니다.",
			  "markdown": true
			},
			{
			  "type": "divider"
			},
			{
			  "type": "text",
			  "text": "현재 예약된 회의를 볼 수 있고\n회의를 예약할 수 있습니다.",
			  "markdown": true
			},
			{
			  "type": "button",
				"action_type": "submit_action",
				"action_name": "meeting_list",
				"value": "meeting_list",
			  "text": "회의 보기",
			  "style": "default"
			},
			{
			   "type": "button",
				"action_type": "call_modal",
				"value": "meeting_reservation",
				"text": "회의 예약",
				"style": "default"
			},
			{
			  "type": "divider"
			},
			{
			  "type": "text",
			  "text": "역할을 선택하여 푸시 메시지를 보내거나 받을 수 있습니다.",
			  "markdown": true
			},
			{
			  "type": "button",
			  "text": "역할 설정하기",
			  "style": "default"
			},
			{
			  "type": "button",
			  "text": "메시지 보내기",
			  "style": "default"
			},
			{
			  "type": "divider"
			},
			{
			  "type": "button",
			  "text": "기능 3",
			  "style": "default"
			}
		  ]
      })
    ),
  ]);

  // 응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    result: true,
  });
});

router.post('/request', async (req, res, next) => {
  console.log(req.body);
  const { message, value } = req.body;

  switch (value) {
    case 'meeting_reservation':
      // 설문조사용 모달 전송 (3)
      return res.json({
        view: {
          "title": "회의 예약",
		  "accept": "확인",
		  "decline": "취소",
		  "value": "meeting_reservation_results",
		  "blocks": [
			{
			  "type": "label",
			  "text": "온라인 or 오프라인 선택",
			  "markdown": true
			},
			{
			  "type": "select",
			  "name": "select_onoff",
			  "options": [
				{
				  "text": "온라인",
				  "value": "online"
				},
				{
				  "text": "오프라인",
				  "value": "offline"
				}
			  ],
			  "required": false,
			  "placeholder": "옵션을 선택해주세요"
			},
			{
			  "type": "label",
			  "text": "날짜 입력",
			  "markdown": true
			},
			{
			  "type": "input",
			  "name": "input_date",
			  "required": false,
			  "placeholder": "날짜를 입력해 주세요 ex) 05/14"
			},
			{
			  "type": "label",
			  "text": "회의 목적 입력",
			  "markdown": true
			},
			{
			  "type": "input",
			  "name": "input_purpose",
			  "required": false,
			  "placeholder": "회의 목적을 입력해 주세요 ex) 프로젝트 기획"
			}
		  ]
        },
      });
      break;
    default:
  }

  res.json({});
});


router.post('/callback', async (req, res, next) => {
  console.log(req.body);
  var { message, value } = req.body;

  switch (value) {
    case 'meeting_list':
		  
      // 설문조사 응답 결과 메세지 전송 (3)
		  db.query('select * from meeting', async function(error,meetings){
			  text='';
			  for(var i=0;i<meetings.length;i++){
				  text+=`${meetings[i].date} | ${meetings[i].how} | ${meetings[i].purpose}\n`;
			  }
			  await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				"text": "Push alarm message",
				  "blocks": [
					{
					  "type": "header",
					  "text": "현재 예약된 회의 목록입니다.",
					  "style": "blue"
					},
					{
					  "type": "text",
					  "text": `${text}`,
					  "markdown": true
					}
				  ]
			  });
		  });
		  break;
		  
	case 'meeting_reservation_results':
		  var { actions } = req.body;
      // 설문조사 응답 결과 메세지 전송 (3)
		  
		  db.query(`insert into meeting (date, how, purpose) values(?,?,?)`,
          [actions.input_date, actions.select_onoff, actions.input_purpose], async function(error,result){
			  console.log(result);
			  await libKakaoWork.sendMessage({
				conversationId: message.conversation_id,
				"text": "Push alarm message",
				  "blocks": [
					{
					  "type": "header",
					  "text": "회의 예약에 성공했습니다.",
					  "style": "blue"
					},
					  {
						"type": "text",
						  "text": `${actions.input_date} | ${actions.select_onoff} | ${actions.input_purpose}`,
						  "markdown": true,
					  },
				  ]
			  });
		  });
      break;
    default:
  }

  res.json({ result: true });
});

*/

/*-------------------------------------------------------------------------------*/

router.get('/', async (req, res, next) => {
  // 유저 목록 검색 (1)
  const users = await libKakaoWork.getUserList();

  // 검색된 모든 유저에게 각각 채팅방 생성 (2)
  const conversations = await Promise.all(
    users.map((user) => libKakaoWork.openConversations({ userId: user.id }))
  );

  // 생성된 채팅방에 메세지 전송 (3)
  const messages = await Promise.all([
    conversations.map((conversation) =>
      libKakaoWork.sendMessage({
        conversationId: conversation.id,
        text: '설문조사 이벤트',
        blocks: [
          {
            type: 'header',
            text: '☕ 사내 카페 만족도 조사 🥤',
            style: 'blue',
          },
          {
            type: 'text',
            text:
              '어느덧 사내카페가 바뀐지 한달이 되었습니다.\n구르미들이 카페를 이용하고 계신지 의견을 들어보고자 설문 조사를 진행해봅니다!!\n설문에 참여하면 푸짐한 경품 찬스가있으니 상품 꼭 받아가세요! 🎁',
            markdown: true,
          },
          {
            type: 'button',
            action_type: 'call_modal',
            value: 'cafe_survey',
            text: '설문 참여하기',
            style: 'default',
          },
        ],
      })
    ),
  ]);
  //응답값은 자유롭게 작성하셔도 됩니다.
  res.json({
    result: true,
  });
});


router.post('/request', async (req, res, next) => {
  console.log(req.body);
  const { message, value } = req.body;

  switch (value) {
    case 'cafe_survey':
      // 설문조사용 모달 전송 (3)
      return res.json({
        view: {
          title: '설문조사',
          accept: '설문조사 전송하기',
          decline: '취소',
          value: 'cafe_survey_results',
          blocks: [
            {
              type: 'label',
              text: '카페 평점을 알려주세요',
              markdown: false,
            },
            {
              type: 'select',
              name: 'rating',
              required: true,
              options: [
                {
                  text: '1점',
                  value: '1',
                },
                {
                  text: '2점',
                  value: '2',
                },
                {
                  text: '3점',
                  value: '3',
                },
                {
                  text: '4점',
                  value: '4',
                },
                {
                  text: '5점',
                  value: '5',
                },
              ],
              placeholder: '평점',
            },
            {
              type: 'label',
              text: '바라는 점이 있다면 알려주세요!',
              markdown: false,
            },
            {
              type: 'input',
              name: 'wanted',
              required: false,
              placeholder: 'ex) 와플을 팔면 좋겠습니다',
            },
          ],
        },
      });
      break;
    default:
  }
	// next();
  res.json({});
});

router.post('/callback', async (req, res, next) => {
  console.log(req.body);
  const { message, actions, action_time, value } = req.body;

  switch (value) {
    case 'cafe_survey_results':
      // 설문조사 응답 결과 메세지 전송 (3)
      await libKakaoWork.sendMessage({
        conversationId: message.conversation_id,
        text: '설문조사에 응해주셔서 감사합니다!',
        blocks: [
          {
            type: 'text',
            text: '설문조사에 응해주셔서 감사합니다! 🎁',
            markdown: true,
          },
          {
            type: 'text',
            text: '*답변 내용*',
            markdown: true,
          },
          {
            type: 'description',
            term: '평점',
            content: {
              type: 'text',
              text: actions.rating,
              markdown: false,
            },
            accent: true,
          },
          {
            type: 'description',
            term: '바라는 점',
            content: {
              type: 'text',
              text: actions.wanted,
              markdown: false,
            },
            accent: true,
          },
          {
            type: 'description',
            term: '시간',
            content: {
              type: 'text',
              text: action_time,
              markdown: false,
            },
            accent: true,
          },
        ],
      });
      break;
    default:
  }
	// next();
  res.json({ result: true });
});

module.exports = router;