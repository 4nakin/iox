/**
 * WURLVariables.js
 * 仿照URLVariables
 * @constructor
 */
function WURLVariables(strSource)
{
    var name,value,i;
    var arrtmp=strSource.split("&");
    for( i=0;i < arrtmp.length;i++)
    {
        num=arrtmp[i].indexOf("=");
        if(num>0)
        {
            name=arrtmp[i].substring(0,num);
            value=arrtmp[i].substr(num+1);
            this[name]=value;
        }
    }
}
