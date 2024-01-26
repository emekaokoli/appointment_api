interface Config {
  port: number;
  accessTokenTtl: string;
  accessTokenPrivateKey: string;
  accessTokenPublicKey: string;
  DATABASE_URL: string;
}

export const config: Config = {
  DATABASE_URL: 'postgres://postgres:master:5432/postgres',
  port: 1487,
  accessTokenTtl: '4h',
  accessTokenPrivateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAh/DpcD5KB0qwANj/S6jQ/6jQUS2KciPv7VvAFQRiH89xbocl
P5YddNdi49oxJZTQSAfS8Qg+kriIZsvzSKsaf9tBl4xSYT1pkmCSIJsRsdoOZ6WL
BuWz3jKYsG7JvOfwPwQBWQyjL46PHgDGKmue3UWqmcoEWuYPKxn2BN6MeNVI+kPU
rnZyLayuc/R+cBXgp6Q3rWxDRa3qsIGWOGoYXsfuc475Lwx4WpspkPSEXyL0cKBw
jhceScDA9GpKzgP9kyei7ZpAbNYmjVc4uLwkFSUcQJYue9AhN+Y8tLeeJ3bgCz8r
vIIt79Hm7cF3ntGLyiAichOo7bbtdE4aQtmc6wIDAQABAoIBAHyDkY4Zv7zGEEf2
eoBWdHh3q7dvOywo9o42R834Ydg5LfDLILcJTJnE3vNM209M6ynO4MudfZLuKyHd
FU0uS+tobL/e62Xd1mEYyz/KSX7Z9++/lYQPyZxwQ6L3FxlMaKWPiZyDEsVwkm4s
z1XzlWOfeA+9FhgcOTCFau4y2f+iG4bDmECbj9YdXKibFvuY1TeK+pb2jEdigYTT
6st3IycMolJydmJqlqH+kROHDV+2Zy8+nM02QTe+pYDo1/Gwr8+yAVIBm/S6kVSZ
npyM9SO7fpSF5BuP++MOYp18l6ykeBXhOXsi6ZuJ+MfsinBt1GhAb5uGT6IgQ9r0
CjN8OEECgYEA8JQDmoJPUbohRCGqo2PSSFuhrxCU9o942EvgliRtgpKgt+8UG13k
s3H0cyDctxO8ii2Mtl4rlVMgaKndm9au9jpy/zQDdF2wBRHopVAUrWt4ibikomKG
I5PKB8ta/r+oEQ+EjvNSa/MZ3dBlvIC3647aSP5s/zourVpSt9rKHQMCgYEAkKfC
k7Z3MsyjGRi3aI4zdDL3hY0F0m08P+z0ud34dnxEpoMG0ANFCZWsLObSLndYH+Vm
aR/9wqoaAJPFxnqy0/+IMoGbYKXImy65Mac11AoJObTOUX71Yced4T05zQhC7I2X
pRMrIbXOwaXOJpD0iWXqgCqqa13unHpLvjftd/kCgYAP+rTWkWs1UXieLuJHofy4
o6V0nFRYoCT1sOyE7Hx9nMGiFfYu7yiepqYG85rVajEuuGHNRyn77B6N9SJsFHFg
l3dF7i2AkCx92berK0uETUwfUa1Vv9eLC2jy5ZXwr8g5Ad/bItxJoUcJjasEP0R4
F+/1wzh4J2QsTYCLB7Q/AwKBgAqagYTaZzpuDbaVPTyIz/TAl6xOfhLCtxvofrfx
MXld+ppKGIG++5yMQCa6dMW7MdaEtlEWaz+NwIIyUtkNvXYU0SMCpSUcgev+LM0a
+LMmWS7Ftin7KHmWbFhKaKZC6MT2TBtpoEvES/ed89KX5ZT8x4fFmOBt7kPCIzM6
XknhAoGAXU3uQIwHT9ZxR4bqgB08JuCtWqvA8AvY8+TRT6YFIeWcYgH63QtRd5CV
F01HYNLEVtyTlPH3ESrIgKKUD2ako1uoke2avy2Ce6/VYQ0B08tWG+qop1QaxCIQ
lyK/kXqIj4oZdkWTTkyK62fA40GzIxqyTg0t2KA7cxIhX4AybS0=
-----END RSA PRIVATE KEY-----`,
  accessTokenPublicKey: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh/DpcD5KB0qwANj/S6jQ
/6jQUS2KciPv7VvAFQRiH89xboclP5YddNdi49oxJZTQSAfS8Qg+kriIZsvzSKsa
f9tBl4xSYT1pkmCSIJsRsdoOZ6WLBuWz3jKYsG7JvOfwPwQBWQyjL46PHgDGKmue
3UWqmcoEWuYPKxn2BN6MeNVI+kPUrnZyLayuc/R+cBXgp6Q3rWxDRa3qsIGWOGoY
Xsfuc475Lwx4WpspkPSEXyL0cKBwjhceScDA9GpKzgP9kyei7ZpAbNYmjVc4uLwk
FSUcQJYue9AhN+Y8tLeeJ3bgCz8rvIIt79Hm7cF3ntGLyiAichOo7bbtdE4aQtmc
6wIDAQAB
-----END PUBLIC KEY-----`,
};
