//import db from '../lib/database.js'

let handler = async (m, { conn, text }) => {
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'â³ï¸ Tag the user'
  let txt = text.replace('@' + who.split`@`[0], '').trim()
  if (!txt) throw 'â³ï¸ Enter the amount of *XP* you want to add'
  if (isNaN(txt)) throw ' ð¢ only numbers'
  let xp = parseInt(txt)
  let exp = xp
  
  if (exp < 1) throw 'â³ï¸ MÃ­nimum *1*'
  let users = global.db.data.users
  users[who].exp += xp

  await m.reply(`â¡ *XP ADDED*
âââââââââââââââ
â¢  *Total:* ${xp}
âââââââââââââââ`)
 conn.fakeReply(m.chat, `â¢ Did you recieve \n\n *+${xp} XP*`, who, m.text)
}

handler.help = ['addxp <@user>']
handler.tags = ['econ']
handler.command = ['addxp'] 
handler.rowner = true

export default handler

