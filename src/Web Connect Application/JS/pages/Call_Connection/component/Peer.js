import SimplePeer from 'simple-peer';

 export const Senderpeer=(stream)=>{
        try {
            const peer=new SimplePeer({
                initiator:true,
                stream:stream,
                trickle:false
                // config:{
                //     iceServers:[
                //         {
                //             urls:'http://localhost:3000'
                //         }
                //     ]
                // }
            });
        return(peer)
        } catch (error) {
            console.log(error)
        }
}

 export const Receiverpeer=(stream)=>{
        try {
            const peer=new SimplePeer({
                initiator:false,
                stream:stream,
                trickle:false
                // config:{
                //     iceServers:[
                //         {
                //             urls:'http://localhost:3000'
                //         }
                //     ]
                // }
            });
        return(peer)
        } catch (error) {
            console.log(error)
        }
}
