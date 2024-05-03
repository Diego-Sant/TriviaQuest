import { getQuiz, getUserProgress } from '@/db/queries'
import Quiz from '../quiz';

import { redirect } from 'next/navigation';

type Props = {
    params: {
        quizId: number;
    };
}

const QuizIdPage = async ({params} : Props) => {
    const quizData = getQuiz(params.quizId);
    const userProgressData = getUserProgress();

    const [quiz, userProgress] = await 
        Promise.all([quizData, userProgressData])

    if (!quiz || !userProgress) {
        redirect("/quizzes")
    }

    const initialPercentage = quiz.challenges
        .filter((challenge) => challenge.completed)
        .length / quiz.challenges.length * 100;

  return (
    <Quiz initialQuizId={quiz.id} initialQuizChallenges={quiz.challenges}
        initialHearts={userProgress.hearts} initialPercentage={initialPercentage}
        userSubscription={null}
    />
  )
}

export default QuizIdPage
