import { getQuiz, getUserProgress, getUserSubscription } from '@/db/queries'
import Quiz from './quiz';

import { redirect } from 'next/navigation';

const QuizPage = async () => {
    const quizData = getQuiz();
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [quiz, userProgress, userSubscription] = await 
        Promise.all([quizData, userProgressData, userSubscriptionData])

    if (!quiz || !userProgress) {
        redirect("/quizzes")
    }

    const initialPercentage = quiz.challenges
        .filter((challenge) => challenge.completed)
        .length / quiz.challenges.length * 100;

  return (
    <Quiz initialQuizId={quiz.id} initialQuizChallenges={quiz.challenges}
        initialHearts={userProgress.hearts} initialPercentage={initialPercentage}
        userSubscription={userSubscription}
    />
  )
}

export default QuizPage
