module.exports = (app, socketIo) => {
    socketIo.on('connection',function(client){
        //接收客户端传过来的数据
        client.on('message',function(data){
            //向客户端广播数据
            console.log(data)
            socketIo.emit('notice', data);
        });
        // 客户端断开连接
        client.on('close', () => {
            console.log("断开连接");
        });
    });
}