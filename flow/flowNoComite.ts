import { addKeyword } from "@builderbot/bot";
import flowCierre from "./flowCierre";



const WAITING_TIME = Number(process.env.WAITING_TIME);



const flowNoComite = addKeyword (['2','No','Quiero Apoyar'])
.addAnswer(
    '✨ ¡Gracias por tu disposición para apoyarnos! 💙😊',
    { idle:WAITING_TIME },
    async (ctx, { flowDynamic, gotoFlow }) => {
        if (!ctx.body || ctx.body.trim() === '') {
            await flowDynamic('⏳ Parece que no recibimos tu respuesta a tiempo. No te preocupes, siempre puedes escribirnos cuando quieras. ¡Estamos aquí para ti! 😊');
            return gotoFlow(flowCierre, 0);
        } else {
            await flowDynamic(['🙏 Tu apoyo es muy valioso para nosotros. Para que podamos contactarte y brindarte más información, por favor completa este formulario y luego escríbele al contacto adjunto: 📋👇',
                '[Formulario](https://forms.office.com/r/eLMu9U6ajF)'])
        }
    },
    []
)
.addAction(
    async (ctx, { provider }) => {
        await provider.sendContact(ctx.key.remoteJid, '+573242170537', 'Asesor')
    }
)
export default flowNoComite