import styled from "styled-components";
import { randomFromString } from "../lib/random";

const MainichiContainer = styled.div`
`;

const MainichiHeader = styled.h2`
  display: inline-block;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainColor};
`;

const WordsContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  margin-top: 1rem;
`;

const WordCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.1em;
  background-color: ${props => props.color};
  align-items: center;
  padding: 1em;
  width: 100%;
  color: black;
`;

const WordCardLine = styled.hr`
  border: 0;
  border-top: 1px solid black;
  width: 100%;
`;

const WordCardImage = styled.img`
  max-height: 8em;
  max-width: 11em;
  margin-bottom: 1em;
`;

const WordCardMeaning = styled.div`
  font-size: 0.75em;
  text-transform: uppercase;
`;

const WordCardWord1 = styled.div`
  width: 100%;
  text-align: left;
`;

const WordCardReading = styled.div`
  display: flex;
  width: 100%;
  text-transform: lowercase;
  justify-content: space-between;
`

const WordCardWord2 = styled.div`
  font-weight: 600;
  display: flex;
  width: 100%;
  text-transform: lowercase;
  justify-content: space-between;
  font-size: 125%;
`

const colors = ["#2ecc71", "#f39c12", "#f15353", "#1b97ae", "#e67e22", "#1abc9c"];
const colors2 = ["#84c6f4", "#9af996", "#a3ffed", "#beb4ff", "#d89bde", "#fda46f", "#ffa2a5", "#ffff79"];

export interface IMainichiComponentProps {
  words?: IMainichiDataProps;
}

export interface IMainichiDataProps {
  words: Array<IWordProps>;
}

interface IWordProps {
  img: string;
  mean: string;
  category: string;
  jp: { wd: string, kj: string, rmj: string };
  cn: { wd: string, py: string };
}

interface IWordCardProps {
  word: IWordProps;
}

function getWords(words: Array<IWordProps>, n: number): Array<IWordProps> {
  const rand = randomFromString((new Date()).toDateString() + "foo");
  return [...Array(n)]
    .map((_, i) => {
      const ii = Math.floor(words.length * rand());
      return words[ii];
    });
}

function getColor(word: IWordProps): string {
  const rand = randomFromString(word.mean);
  const i = Math.floor(colors.length * rand());
  return colors[i];
}

const WordCard = ({ word }: IWordCardProps) => {

  return <WordCardContainer color={getColor(word)}>
    <WordCardImage src={"./images/" + word.img + ".png"} />
    <WordCardMeaning>{word.mean}</WordCardMeaning>
    <WordCardLine />
    <WordCardWord1>{word.jp.wd}</WordCardWord1>
    <WordCardWord2>
      <div>{word.jp.kj}</div>
      <div>{word.cn.wd}</div>
    </WordCardWord2>
    <WordCardLine />
    <WordCardReading>
      <div>{word.jp.rmj.replace("-", "·")}</div>
      <div>{word.cn.py.replace("-", "·")}</div>
    </WordCardReading>
  </WordCardContainer>;
}

/**
 * Renders the Greeter
 * @param {IGreeterComponentProps} data required greeter data
 * @returns {React.ReactNode} the greeter
 */
const Mainichi = ({ words }: IMainichiComponentProps) => {
  if (words === undefined) return <></>;

  return (
    <MainichiContainer>
      <MainichiHeader>Today's words are:</MainichiHeader>
      <WordsContainer>
        {getWords(words.words, 4).map((word) => <WordCard word={word} />)}
      </WordsContainer>
    </MainichiContainer>
  );
};

export default Mainichi;
