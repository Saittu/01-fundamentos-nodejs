import { transcode } from 'node:buffer'
import http from 'node:http'
import { Transform } from 'node:stream'

class InverseNumber extends Transform {
    _transform(chunck, enconding, callback) {
        const tranfomed = Number(chunck.toString()) * -1

        console.log(tranfomed)
        callback(null, Buffer.from(String(tranfomed)))
    }
}

const server = http.createServer(async(req, res) => {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    } 

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

    // return req
    //     .pipe(new InverseNumber())
    //     .pipe(res)
})

server.listen(3334)