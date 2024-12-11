//הגדרת משתנים
let element, width, height, bgColor, textColor, fontSize, fontFamily, content, border, borderRadius, textSadow, boxSadow, padding, margin, aligmentText, idElemnt, titleElemnt ;

//בעת עליית הדף, נבדוק האם המשתמש רוצה להשתמש בדף הקודם שלו
onload = ()=>{

    if(sessionStorage.length > 1){
        let answer = confirm('האם תרצה להמשיך עם הלוח הקודם שלך ?');
        if(answer){
            document.getElementById('screenBox').innerHTML = sessionStorage.getItem('screen');//נכניס לאלמנט המסמך את כל הערכים כילדים שלו  
            let arrAtr = JSON.parse(sessionStorage.getItem('atrScreen')); // נשלוף את מערך הערכים מזיכרון ונהפוך
            if(arrAtr != null){
                //נחיל את העיצוב על אלמנט המסמך
                document.getElementById('screenBox').style.backgroundColor = arrAtr[0];
                document.getElementById('screenBox').style.padding = arrAtr[1];
                document.getElementById('screenBox').style.margin = arrAtr[2];
            }
            
        }
        else{
            sessionStorage.clear(); //אם רוצים להתחיל לוח חדש ננקה את הזיכרון
        }
    }
}


//אתחול העיצוב
document.getElementById('degineBody').style.display = 'none'; 
document.getElementById('contentSide').style.display = "none"; 


//פונקציה שמציגה את כל תפריט העיצוב הצידי בעת לחיצה במקום המתאים
function showElementDesign(){
    document.getElementById('degineBody').style.display = 'none'; //נסגור את התרפיט השני 

    if(document.getElementById('contentSide').style.display == "none"){
        document.getElementById('contentSide').style.display = "flex";
        //נחביא את עיצובי הטקסט
        document.getElementById('chooseFontSize').style.display = 'none';
        document.getElementById('chooseTextColor').style.display = 'none';
        document.getElementById('chooseSadowText').style.display = 'none';
        document.getElementById('chooseAlignmentText').style.display = 'none';
    }
    else
        document.getElementById('contentSide').style.display = "none";
}


//פונקציה שמציגה את אופציות העיצוב לאלמנט הגוף
function showDesignBody(){    
    document.getElementById('contentSide').style.display = "none"; //נסגור את התפריט השני

    if(document.getElementById('degineBody').style.display == 'none'){
        document.getElementById('degineBody').style.display = 'block';        
    }
    else{
        document.getElementById('degineBody').style.display = 'none';        
    }
}



//כאשר יכניסו טקסט יפתחו אופציות עיצוב נוספות
document.getElementById('contentId').addEventListener('input', (event) => {
    
    //במידה וימחקו את הטקסט נוריד את אופציות העיצוב
    if(event.target.value == ''){
        document.getElementById('chooseFontSize').style.display = 'none';
        document.getElementById('chooseTextColor').style.display = 'none';
        document.getElementById('chooseSadowText').style.display = 'none';
        document.getElementById('chooseAlignmentText').style.display = 'none';
    }
    else{
        document.getElementById('chooseFontSize').style.display = 'block';
        document.getElementById('chooseTextColor').style.display = 'block';
        document.getElementById('chooseSadowText').style.display = 'block';
        document.getElementById('chooseAlignmentText').style.display = 'block';
    }
});


//פונקציה שאחראית על שמירת עיצוב של הגוף
function bodyValueSaving(){
        bgColor = document.getElementById('colorBodyId').value;

        //אם אחד מהשדות של הכיוונים לא מולאו נשים שם 0 - ריווח חיצוני, ריווח פנימי ויעיגול פינות
        let inputsPadding = document.getElementById('choosePaddingBody').querySelectorAll('input');
        for(let i = 0; i < inputsPadding.length; i++)
            if(inputsPadding[i].value == '')
                inputsPadding[i].value = 0;       

        let inputsMargin= document.getElementById('chooseMarginBody').querySelectorAll('input');
            for(let i = 0; i < inputsMargin.length; i++)
                if(inputsMargin[i].value == '')
                    inputsMargin[i].value = 0;

        //ריווח פנימי
        let paddingT = document.getElementById('paddingTopBody').value;
        let paddingR = document.getElementById('paddingRightBody').value;
        let paddingL = document.getElementById('paddingLeftBody').value;
        let paddingB = document.getElementById('paddingBottomBody').value;

        padding = paddingT + 'px ' + paddingR + 'px ' + paddingB + 'px ' + paddingL + 'px';
        
        //ריווח חיצוני
        let marginT = document.getElementById('marginTopBody').value;
        let marginR = document.getElementById('marginRightBody').value;
        let marginL = document.getElementById('marginLeftBody').value;
        let marginB = document.getElementById('marginBottomBody').value;

        margin = marginT + 'px ' + marginR + 'px ' + marginB + 'px ' + marginL + 'px';

        //הוספת העיצוב לאלמנט הגוף
        let semiBody = document.getElementById('screenBox');
        semiBody.style.backgroundColor = bgColor;
        semiBody.style.padding = padding;
        semiBody.style.margin = margin;

        savingInSession();//קריאה לפונקציה ששומרת בזיכרון - נשמור באופן אוטומטי לאחר הוספת אלמנט ללוח

    }



function takingChoosenValues(){
       
    if(document.getElementById('selectElemntId').value == -1)
        alert('לא נבחר אלמנט')
    else{
        //שמירת ערכי העיצוב הנבחר
        element = document.getElementById('chooseElement').querySelector('select').value;
        width = document.getElementById('chooseWidth').querySelector('input').value;
        height = document.getElementById('chooseHeight').querySelector('input').value;
        bgColor = document.getElementById('chooseBgColor').querySelector('input').value;    
        textColor = document.getElementById('chooseTextColor').querySelector('input').value;    
        fontSize = document.getElementById('chooseFontSize').querySelector('input').value;
        content = document.getElementById('chooseContent').querySelector('textarea').value;
        aligmentText = document.getElementById('selectAlignmentText').value;

        //TODO:  לעשות את השמירת ערכים בלולאות ומערכים / בדרך יעילה יותר ? 

        //מסגרת
        let thicknessLine = document.getElementById('thicknessBorderId').value;
        let styleLine = document.getElementById('borderStyleId').value;
        let colorLine = document.getElementById('borderColorId').value;

        border = thicknessLine + 'px ' + styleLine + colorLine;

        //צל לטקסט
        let textSadowX = document.getElementById('sadowTextX').value;
        let textSadowY = document.getElementById('sadowTextY').value;
        let textSadowBlur = document.getElementById('sadowTextBlur').value;
        let textSadowColor = document.getElementById('sadowTextColor').value;

        textSadow = textSadowX + 'px ' + textSadowY + 'px ' + textSadowBlur + 'px ' + textSadowColor;

        //צל לאלמנט
        let BoxSadowX = document.getElementById('sadowBoxX').value;
        let BoxSadowY = document.getElementById('sadowBoxY').value;        
        let BoxSadowBlur = document.getElementById('sadowBoxBlur').value;
        let BoxSadowSpread = document.getElementById('sadowBoxSpread').value;        
        let BoxSadowColor = document.getElementById('sadowBoxColor').value;

        boxSadow = BoxSadowX + 'px ' + BoxSadowY + 'px ' + BoxSadowBlur + 'px ' + BoxSadowSpread + 'px '+ BoxSadowColor;


        //אם אחד מהשדות של הכיוונים לא מולאו נשים שם 0 - ריווח חיצוני, ריווח פנימי ויעיגול פינות
        let inputsPadding = document.getElementById('choosePadding').querySelectorAll('input');
        for(let i = 0; i < inputsPadding.length; i++)
            if(inputsPadding[i].value == '')
                inputsPadding[i].value = 0;       

        let inputsMargin= document.getElementById('chooseMargin').querySelectorAll('input');
            for(let i = 0; i < inputsMargin.length; i++)
                if(inputsMargin[i].value == '')
                    inputsMargin[i].value = 0;

        let inputsBorderRadius = document.getElementById('chooseBorderRadius').querySelectorAll('input');
        for(let i = 0; i < inputsBorderRadius.length; i++)
            if(inputsBorderRadius[i].value == '')
                inputsBorderRadius[i].value = 0;


        //עיגול פינות
        let borderRadiusTL = document.getElementById('borderTopLeft').value;
        let borderRadiusTR = document.getElementById('borderTopRight').value;   
        let borderRadiusBR = document.getElementById('borderBottomRight').value;
        let borderRadiusBL = document.getElementById('borderBottomLeft').value;
        borderRadius = borderRadiusTL + 'px ' + borderRadiusBR + 'px ' + borderRadiusBR + 'px ' + borderRadiusBL + 'px';
        
        //ריווח פנימי
        let paddingT = document.getElementById('paddingTop').value;
        let paddingR = document.getElementById('paddingRight').value;
        let paddingL = document.getElementById('paddingLeft').value;
        let paddingB = document.getElementById('paddingBottom').value;

        padding = paddingT + 'px ' + paddingR + 'px ' + paddingB + 'px ' + paddingL + 'px';
        
        //ריווח חיצוני
        let marginT = document.getElementById('marginTop').value;
        let marginR = document.getElementById('marginRight').value;
        let marginL = document.getElementById('marginLeft').value;
        let marginB = document.getElementById('marginBottom').value;
        

        margin = marginT + 'px ' + marginR + 'px ' + marginB + 'px ' + marginL + 'px';

        idElemnt = document.getElementById('idInput').value;
        titleElemnt = document.getElementById('titleInput').value;


        createElemnt(); //קריאה לפונקציה שמוסיפה למסמך
    }


}



//פונקציה שיוצרת את האלמנט
function createElemnt(){
    let elementObg = document.createElement(`${element}`); //יצירת האלמנט
    
    //הוספה של כל התכונות לאלמנט
    elementObg.style.width = width + 'px';
    elementObg.style.height = height + 'px';
    elementObg.style.color = textColor;
    elementObg.style.backgroundColor = bgColor;
    elementObg.style.fontSize = fontSize + 'px';
    elementObg.style.textAlign = aligmentText;
    elementObg.innerText = content;
    elementObg.style.borderRadius = borderRadius;
    elementObg.style.padding = padding;
    elementObg.style.margin = margin;

    //בדיקה האם המשתמש מילא את קריטרוני המסגרת
    if(document.getElementById('thicknessBorderId').value != '' && document.getElementById('borderStyleId') != -1)
        elementObg.style.border = border;

    //בדיקה האם המשתמש מילא את קריטריוני הצל
    let inputsTextSadow = document.getElementById('chooseSadowText').querySelectorAll('input');
    let count = 0;
    for(let i = 0; i < inputsTextSadow.length; i++){
        if(inputsTextSadow[i].value != ''){
            count++
        }        
        if(count == inputsTextSadow.length)
            //הוספת עיצוב הצל
            elementObg.style.textShadow = textSadow;
    }

    let inputsBoxSadow = document.getElementById('chooseSadowBox').querySelectorAll('input');
    count = 0;
    for(let i = 0 ; i < inputsBoxSadow.length; i++){
        if(inputsBoxSadow[i].value != ''){
            count++;
        }     
        if(count == inputsBoxSadow.length)
            //הוספת עיצוב הצל
            elementObg.style.boxShadow = boxSadow;
    }
    

    //הוספה של מזהה וכותרת
    if(idElemnt != '')
        elementObg.id = idElemnt;
    if(titleElemnt != '')
        elementObg.title = titleElemnt;
    

    document.getElementById('screenBox').append(elementObg); //הוספה של האלמנט למסמך
    savingInSession();//קריאה לפונקציה ששומרת בזיכרון - נשמור באופן אוטומטי לאחר הוספת אלמנט ללוח
    resetInputs(); //קריאה לפונקציה שמאפסת את התיבות קלט
}




//פונקציה שאחראית על איפוס תיבות הקלט
function resetInputs(){
       //איפוס התיבות קלט והבחירה
        //איפוס של כל הקלטים מסוג צבע 
       let inputsColor = document.querySelectorAll('input[type="color"]');
       for(let i = 0; i < inputsColor.length; i++)
            inputsColor[i].value = '#000000';

       document.getElementById('chooseElement').querySelector('select').value = -1;
       document.getElementById('chooseWidth').querySelector('input').value = '';
       document.getElementById('chooseHeight').querySelector('input').value = '';
       document.getElementById('chooseBgColor').querySelector('input').value = '#ffffff';
       document.getElementById('chooseFontSize').querySelector('input').value = '';
       document.getElementById('chooseContent').querySelector('textarea').value = '';
       document.getElementById('selectAlignmentText').value = 'right';
       document.getElementById('idInput').value = '';
       document.getElementById('titleInput').value = '';

       
       //מסגרת
       document.getElementById('borderStyleId').value = -1;
       document.getElementById('thicknessBorderId').value = '';
   
       let inputBoxSadow = document.getElementById('chooseSadowBox').querySelectorAll('input');
       for(let i = 0; i <inputBoxSadow.length - 1; i++){
           inputBoxSadow[i].value = '';
       }

       let inputTextSadow = document.getElementById('chooseSadowText').querySelectorAll('input');
       for(let i = 0; i <inputTextSadow.length - 1; i++){
           inputTextSadow[i].value = '';
       }

       let inputsBorderRadius = document.getElementById('chooseBorderRadius').querySelectorAll('input');
        for(let i = 0; i <inputsBorderRadius.length; i++){
            inputsBorderRadius[i].value = '';
        }

       let inputsMargin = document.getElementById('chooseMargin').querySelectorAll('input');    
        for(let i = 0; i <inputsMargin.length; i++){
            inputsMargin[i].value = '';
        }

        let inputsPadding = document.getElementById('choosePadding').querySelectorAll('input');
        for(let i = 0; i <inputsPadding.length; i++){
            inputsPadding[i].value = '';
        }

        //נחביא את עיצובי הטקסט - מכיוון שאיפסנו את תיבת הטקסט וכעת אין שם טקסט
        document.getElementById('chooseFontSize').style.display = 'none';
        document.getElementById('chooseTextColor').style.display = 'none';
        document.getElementById('chooseSadowText').style.display = 'none';
        document.getElementById('chooseAlignmentText').style.display = 'none';

}

function componentToHex(component) {
    const hex = component.toString(16); // המרת המספר לבסיס 16
    return hex.length === 1 ? "0" + hex : hex; // הוספת אפס אם צריך
}

function rgbToHexManual(r, g, b) {
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`.toUpperCase();
}

//פונקציה שאחראית על מחיקת הלוח
function deleteBored(){
    let screenBody = document.getElementById('screenBox').children;    
    let lengthMekori = screenBody.length;//נשמור את האורך המקורי
   for(let i = 0; i < lengthMekori; i++)
        screenBody[0].remove();

   sessionStorage.removeItem("screen") //אם רוצים למחוק את האלמנטים אז נחמוק אותם מהזיכרון
}


//פונקציה ששומרת את הדף בזיכרון
function savingInSession(){    
    //נבדוק שיש אופציית זיכרון בדפדפן
    if(Storage != undefined){
        let childrenScreen = document.getElementById('screenBox').innerHTML
        let screenStyle = getComputedStyle(document.getElementById('screenBox'));
        let attrScreen = [screenStyle.getPropertyValue('backGround-Color'),
            screenStyle.getPropertyValue('padding'), 
            screenStyle.getPropertyValue('margin')
        ];
        
        sessionStorage.setItem('atrScreen', JSON.stringify(attrScreen)); //נשמור את עיצוב הדף עצמו
        sessionStorage.setItem('screen', childrenScreen); //נשמור את כל האלמנטים שנוספו למסך כסטרינג
    }
}
