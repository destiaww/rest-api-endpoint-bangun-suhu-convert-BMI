const express = require("express") // memanggil library express js
const bodyParser = require("body-parser") // memanggil library bodyparser
const cors = require("cors") // memanggil library cors
const app = express()

// penggunaan body-parser untuk ekstrak data request berformat JSON
app.use(bodyParser.json())
// penggunaan body-parser untuk ekstrak data request dari body
app.use(bodyParser.urlencoded({extended: true}))
// penggunaan cors agar end point dapat diakses oleh cross platform
app.use(cors())


app.listen(8000, () => {
    console.log("Server run on port 8000");
   })


// 1.empat end-point yang masing-masing digunakan untuk menghitung volume dan luas permukaan dari sebuah bangun ruang
app.post("/kubus", (req,res) => {
    let sisi=Number(req.body.sisi)
    let volume=sisi**3
    let luas_perm= 6 * sisi**2
    let response = {
    sisi: sisi,
    result: {
        volume: volume,
        luas_perm: luas_perm
    }
    }
    res.json(response)
})
app.post("/balok", (req,res) => {
    let panjang=Number(req.body.panjang)
    let lebar=Number(req.body.lebar)
    let tinggi=Number(req.body.tinggi)
    let volume=panjang*lebar*tinggi
    let luas_perm=(panjang*lebar + panjang*tinggi + lebar*tinggi)* 2
    let response = {
    panjang: panjang, 
    lebar: lebar, 
    tinggi: tinggi,
    result: {
        volume: volume,
        luas_perm: luas_perm
    }
    }
    res.json(response)
})
app.post("/bola", (req,res) => {
    let r=Number(req.body.r)
    let volume=3/4 * 3.14 * r **3
    let luas_perm= 4*3.14* r **2
    let response = {
        r: r, 
        result: {
        volume: volume,
        luas_perm: luas_perm
    }
    }
    res.json(response)
})
app.post("/kerucut", (req,res) => {
    let r = Number(req.body.r)   
    let tinggi = Number(req.body.tinggi)
    let sisi_miring = Number(req.body.sisi_miring)

    if(r % 7 == 0) {
        let volume = 22 * r **2 * tinggi /7 /3
        let luas_permukaan = 22 * r * (sisi_miring + r) /7
        let response = {
            r: r,
            tinggi: tinggi,
            sisi_miring: sisi_miring,
            result:{
                volume: volume,
                luas_permukaan: luas_permukaan,
            }
        }
        res.json(response)
    }else{
        
    let volume = 3.14 * r **2 * tinggi /3
    let luas_permukaan = 3.14 * r * (sisi_miring + r)
    let response = {
        r: r,
        tinggi: tinggi,
        sisi_miring: sisi_miring,
        result:{
            volume: volume,
            luas_permukaan: luas_permukaan,
        }
    }
    res.json(response)
    }
   
})

//2.empat buah end-point untuk mengkonversi nilai suhu dari satu satuan ke satuan yang lain!
app.post("convert/celcius/:suhu", (req,res) => {
    let suhu = req.body.suhu
    let reamur = 4*suhu/5
    let fahrenheit = 9*suhu/5+32
    let kelvin = 5*suhu/5+273
    let response = {
        celcius: suhu,
        result:{
            reamur: reamur,
            fahrenheit: fahrenheit,
            kelvin: kelvin
        }
    }
    res.json(response)
    })
    app.post("/convert/reamur/:suhu", (req,res) => {
        let suhu = req.body.suhu
        let celcius = 5*suhu/4
        let fahrenheit = 9*suhu/4+32
        let kelvin = 5*suhu/4+273
        let response = {
            reamur: suhu,
            result:{
                celcius: celcius,
                fahrenheit: fahrenheit,
                kelvin: kelvin
            }
        }
    res.json(response)
    })
    app.post("/convert/kelvin/:suhu", (req,res) => {
        let suhu = req.body.suhu
        let celcius = 5*(suhu-273)/5
        let fahrenheit = 9*(suhu-273)/5+32
        let reamur = 4*(suhu-273)/5
        let response = {
            kelvin: suhu,
            result:{
                celcius: celcius,
                fahrenheit: fahrenheit,
                reamur: reamur
            }
        }
    res.json(response)
    })
    app.post("/convert/fahrenheit/", (req,res) => {
        let suhu = req.body.suhu
        let celcius = 5*(suhu-32)/9
        let reamur = 4*(suhu-32)/9
        let kelvin = 5*(suhu-32)/9+273
        let response = {
            fahrenheit: suhu,
            result:{
                celcius: celcius,
                reamur: reamur,
                kelvin: kelvin
            }
        }
    res.json(response)
    })
    
//3. empat buah end-point yang masingmasing digunakan untuk mengkonversi dari satu jenis bilangan ke jenis bilangan yang lain
app.post("/convert/biner", (req,res) => {
    let no = Number(req.body.no)
    let desimal = parseInt(no, 2).toString(10)
    let oktal = parseInt(no, 2).toString(8)
    let heksadesimal = parseInt(no, 2).toString(16)
    let response = {
        angka: no,
        result:{
            Desimal: desimal,
            Oktal: oktal,
            Heksadesimal: heksadesimal
        }
    }
res.json(response)
})
app.post("/convert/desimal/:no", (req,res) => {
    let no = req.body.no
    let biner = parseInt(no, 10).toString(2)
    let oktal = parseInt(no, 10).toString(8)
    let heksadesimal = parseInt(no, 10).toString(16)
    let response = {
        No: no,
        result:{
            Biner: biner,
            Oktal: oktal,
            Heksadesimal: heksadesimal
        }
    }
res.json(response)
})
app.post("/convert/oktal/:no", (req,res) => {
    let no = req.body.no
    let biner = parseInt(no, 8).toString(2)
    let desimal = parseInt(no, 8).toString(10)
    let heksadesimal = parseInt(no, 8).toString(16)
    let response = {
        No: no,
        result:{
            Biner: biner,
            Desimal: desimal,
            Heksadesimal: heksadesimal
        }
    }
res.json(response)
})
app.post("/convert/heksadesimal/:no", (req,res) => {
    let no = req.body.no
    let biner = parseInt(no, 16).toString(2)
    let desimal = parseInt(no, 16).toString(10)
    let oktal = parseInt(no, 16).toString(8)
    let response = {
        No: no,
        result:{
            Biner: biner,
            Desimal: desimal,
            Oktal: oktal
        }
    }
res.json(response)
})

//4.  end-point untuk menghitung Body Mass Index (BMI)
// <18.5 = kekurangan berat badan
// 18.5-24.9 = normal (ideal)
// 25.0-29.9 = (kelebihan berat badan)
// >= 30.0 = kegemukan(obesitas)

app.post("/bmi", (req,res) => {
    let bb = req.body.bb
    let tb = req.body.tb
    let bmi = (bb/(tb**2))*10000
    let status = ''
    if (bmi<18.5) {
        status= "Kekurangan berat badan"
    } else if(bmi>=18.5&&bmi<=24.9){
        status= "Normal (Ideal)"
    } else if(bmi>=25.0&&bmi<=29.9){
        status= "Kelebihan berat badan"
    } else if(bmi>=30.0){
        status= "Kegemukan (Obesitas)"
    }
    let response = {
        Berat: bb+' kg',
        Tinggi: tb+' cm',
        BMI: bmi,
        Status: status
    }
    res.json(response)
})

//5. end-point untuk menentukan ganjil atau genap suatu bilangan

app.post("/ganjilgenap", (req,res) => {
    let angka = req.body.angka
    let penentuan = angka % 2
    let status = ''
    if (penentuan == 0) {
        status= "Angka termasuk bilangan genap"
    } else{
        status= "Angka termasuk bilangan ganjil"
    } 
    let response = {
        angka : angka,
        status: status
    }
    res.json(response)
})
