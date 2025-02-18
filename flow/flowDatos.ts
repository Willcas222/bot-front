import { addKeyword, EVENTS } from "@builderbot/bot";
import mainflow from "./mainflow";
import flowCuestionario from "./flowCuestionario";

const WAITING_TIME = Number(process.env.WAITING_TIME);

const flowDatos = addKeyword(EVENTS.WELCOME) 
    .addAnswer('🔒 Antes de continuar, necesitamos tu autorización para tratar tus datos personales. ¿Autorizas el tratamiento de tus datos? escribe "sí" o "no".', 
        {
        capture: true,
        idle: WAITING_TIME,
        }, async (ctx, { flowDynamic,state }) => {
            const respuesta = ctx.body.trim();
            await state.update({ respuesta });
            const data = state.getMyState(); 
            await flowDynamic(`👌 ¡Gracias por tu autorización! 😊 Tu respuesta fue: "${data.respuesta}". Ahora, seguimos adelante.`);
        },
        [mainflow,flowCuestionario]
)


export default flowDatos;
