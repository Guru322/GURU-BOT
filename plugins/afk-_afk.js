//import db from '../lib/database.js'

export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`
  ā You stopped being AFK 
${user.afkReason ? ' \nā¢ *Reason :* ' + user.afkReason : ''}
ā¢ *AFK Duration :* ${(new Date - user.afk).toTimeString()}
  `.trim())
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`
š¤ The human u mentioned is afk 

${reason ? 'ā¢ *Reason* : ' + reason : 'ā¢ *Reason* : Without reason'}
ā¢ *AFK Duration :* ${(new Date - afkTime).toTimeString()}
  `.trim())
    }
    return true
}
