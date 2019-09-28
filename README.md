## IPFS Serverless File storage Distributed App   

The following demonstrates how to create and IPFS node on your local and upload files to the IPFS network.
Dynamodb used to persist has references to the files stores within the IPFS network.

### Getting started 

Ensure you have node js >= v12 installed

    $ npm install 

### Terminate node server on local  
  
Inorder to terminante the node server and IPFS node running on your local press control + c to kill the server.  in the event server is not properly terminated try the following   
  
    $ sudo lsof -i :3000 #see whats running on port 3000 default port 

for the node app and kill the process using command below   
  
    kill -9 {PID}   

  
## Run App on local machine   

    $ node index.js   

  
outputs   
  

    11:43 $ node index.js  
    Example app listening on port 3000  
    Swarm listening on /ip4/127.0.0.1/tcp/4002/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /ip4/192.168.0.101/tcp/4002/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /ip4/127.0.0.1/tcp/4003/ws/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /p2p-circuit/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /p2p-circuit/ip4/127.0.0.1/tcp/4002/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /p2p-circuit/ip4/192.168.0.101/tcp/4002/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  
    Swarm listening on /p2p-circuit/ip4/127.0.0.1/tcp/4003/ws/ipfs/QmTy1U5zCiuDEPd3Jy3f4p4f2J8Rx2axBP1KyXPPfFuAGX  

  
### How to call REST API methods
  

    curl -X POST \  
      http://localhost:3000/api/v1/uploads \  
      -H 'cache-control: no-cache' \  
      -H 'content-type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' \  
      -H 'postman-token: 55391892-47da-a352-978f-3ec09feb7048' \  
      -F 'file=@AWS data ingestor proto.png'
