


let mapsTrans = []; // list of all valid transactions for graph

function graphTrans (transaction, item, startDate, endDate, lat, lon, radius){
  for(i=0; i < transaction.length; i++ ){
    if(transaction[i].item == item){
      if( getFullYear(transaction[i].date) < getFullYear(endDate) && getFullYear(transaction[i].date) > getFullYear(startDate)){
        if(getMonth(transaction[i].date) < getMonth(endDate) && getMonth(transaction[i].date) > getMonth(startDate)){
          if(getDate(transaction[i].date) < getDate(endDate) && getDate(transaction[i].date) > getDate(startDate)){
            if (isInside(lat, lon, radius, transaction[i].lat, transaction[i].lon) == 1){

              mapsTrans.push(transcation[i]);
            }
          }
        }
      }
    }
}

function isInside(latCenter, lonCenter, radius, latTest, lonTest){
  let r = 6371000;
  let dlon = lonTest - lonCenter;
  let dlat = latTest - latCenter;
  let a = Math.pow((Math.sin(dlat/2)), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow( (Math.sin(dlon/2)), 2);
  let c = 2 * Math.pow(Math.atan( Math.sqrt(a), Math.sqrt(1-a) ), 2);
  let d = r * c; //(where R is the radius of the Earth)
  if (d <= radius){return 1;}
  else {return 0;}
}
