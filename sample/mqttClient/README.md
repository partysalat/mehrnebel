# Sample Client 

## Certificates
You can create a CSR with the following command
```
openssl req -nodes -newkey rsa:2048 -sha256 -keyout 'aws_iot_thing.key' -out 'aws_iot_thing.csr' -subj '/CN=aws_iot_thing/C=DE'
```
This will create two files. The first is the <yourname>.csr, which can be added as a new iot thing in iot-things.yaml.

The second file <yourname>.key is your private key. Together with the root ca from AWS (see http://docs.aws.amazon.com/iot/latest/developerguide/managing-device-certs.html)
you have everything in place 


