const express = require("express");
const router = express.Router();

const welcomeMessage = require("../blockKit/WelcomeMessage");
const setRoleMessage = require("../blockKit/pushMessage/setRoleMessage");
const addRoleModal = require("../blockKit/pushMessage/addRoleModal");
let selectRoleModal = require("../blockKit/pushMessage/selectRoleModal");
let sendMessageModal = require("../blockKit/pushMessage/sendMessageModal");
let showRoleMessage = require("../blockKit/pushMessage/showRoleMessage");
let noRoleMessage = require("../blockKit/pushMessage/noRoleMessage");
const resetRoleMessage = require("../blockKit/pushMessage/resetRoleMessage");
const noExistRoleMessage = require("../blockKit/pushMessage/noExistRoleMessage");

const libKakaoWork = require("../libs/kakaoWork");
// routes/post.js
router.post("/", async (req, res, next) => {
    const { message, value, react_user_id } = req.body;
    console.log(value);
    switch (value) {
        case "setRoleMessage": {
			console.log(value);
            libKakaoWork.sendMessage({
                conversationId: message.conversation_id,
                text: setRoleMessage.text,
                blocks: setRoleMessage.blocks,
            });
            return res.json(setRoleMessage);
            break;
        }
        case "addRoleModal": {
            res.json({ view: addRoleModal });
            break;
        }
        case "selectRoleModal": {
            let rows = await libKakaoWork.mysql_query(
                `select distinct role from push_role;`
            );
            if (rows.length === 0) {
                libKakaoWork.sendMessage({
                    conversationId: message.conversation_id,
                    text: noExistRoleMessage.text,
                    blocks: noExistRoleMessage.blocks,
                });
                break;
            }
            const roles = rows.map((row) => {
                return { text: row.role, value: row.role };
            });
            selectRoleModal.blocks[1].options = roles;
            res.json({ view: selectRoleModal });
            break;
        }
        case "showRoleMessage": {
            let rows = await libKakaoWork.mysql_query(
                `select distinct role from push_role where user_id=${react_user_id};`
            );
            let role_message;
            if (rows.length !== 0) {
                const roles = rows.map((row) => {
                    return row.role;
                });
                const roles_str = roles.join(", ");
                showRoleMessage.blocks[0].text = `선택한 역할은 ${roles_str} 입니다.`;
                role_message = showRoleMessage;
            } else {
                role_message = noRoleMessage;
            }
            await libKakaoWork.sendMessage({
                conversationId: message.conversation_id,
                text: role_message.text,
                blocks: role_message.blocks,
            });
            break;
        }
        case "returnWelcome": {
            await libKakaoWork.sendMessage({
                conversationId: message.conversation_id,
                text: welcomeMessage.text,
                blocks: welcomeMessage.blocks,
            });
            break;
        }
        case "sendMessageModal": {
            let rows = await libKakaoWork.mysql_query(
                `select distinct role from push_role;`
            );
            const roles = rows.map((row) => {
                return { text: row.role, value: row.role };
            });
            sendMessageModal.blocks[1].options = roles;
            res.json({ view: sendMessageModal });
            break;
        }
        case "resetRoleMessage": {
            let rows = await libKakaoWork.mysql_query(
                `delete from push_role where user_id="${react_user_id}"`
            );
            await libKakaoWork.sendMessage({
                conversationId: message.conversation_id,
                text: resetRoleMessage.text,
                blocks: resetRoleMessage.blocks,
            });
            break;
        }
        default: {
            res.json({});
            break;
        }
    }
	// next();
});

module.exports = router;
