import React,{useState, useEffect} from "react";
import alanBtn from "@alan-ai/alan-sdk-web" ;
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles" ;
import wordsToNumbers from "words-to-numbers";

const alanKey = "6b5dadabab134fb7a01c583a89a19a872e956eca572e1d8b807a3e2338fdd0dc/stage" ;

const App = ()=>{
    const classes = useStyles();
    const [newsArticles,setNewsArticles] = useState([]);
    const [activeArticle,setActiveArticle]= useState(-1);

    useEffect(()=>{
        alanBtn({
            key: alanKey,
            onCommand: ({command, articles,number})=>{
                if(command==='newHeadlines'){
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                }
                else if(command==='highlight'){
                    setActiveArticle((prevActiveArticle)=>prevActiveArticle+1);
                }
                else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];
                    window.open(article.url, '_blank');
                    // if (parsedNumber > articles.length) {
                    //   alanBtn().playText('Please try that again...');
                    // } else if (article) {
                    //   window.open(article.url, '_blank');
                    //   alanBtn().playText('Opening...');
                    // } else {
                    //   alanBtn().playText('Please try that again...');
                    // }
                }
            }
        })
    },[])

    return (
        <div>
            <div className={classes.logoContainer}>
                <img src="https://voicebot.ai/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan-ai logo"/>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
        
    )
    
}

export default App ;