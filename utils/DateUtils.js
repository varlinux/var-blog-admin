export default class DataUtils {
    static format(format, data) {
        format = format || "YYYY-MM-DD hh:mm:ss";
        let opt = {
            "Y+": data.getFullYear().toString(),
            "M+": (data.getMonth() + 1).toString(),
            "D+": data.getDay().toString(),
            "h+": data.getHours().toString(),
            "m+": data.getMinutes().toString(),
            "s+": data.getSeconds().toString()
        }, temp;
        for (let item in opt) {
            format = format.replace(new RegExp(item), d => {
                return opt[item].padStart(d.length, '0');
            });
        }
        return format;
    }
    static now() {
        return this.format(null, new Date());
    }
}