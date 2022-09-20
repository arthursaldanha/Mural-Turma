import { FormEvent, useState } from 'react';

import { ArrowLeft } from 'phosphor-react';

import FeedbackService from '@/domain/Feedbacks/services/implementations/FeedbacksService';
import { httpClient } from '@/infra/AxiosHttpClient';
import { useToast } from '@/shared/hooks/useToast';

import { FeedbackType, feedbackTypes } from '..';

import { CloseButton } from '../../CloseButton';
import { Loading } from '../../Loading';
import { ScreenshotButton } from '../ScreenshotButton';

interface IFeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

const feedbackService = new FeedbackService(
  httpClient({ baseURL: process.env.NEXT_PUBLIC_API_MURAL_URL as string }),
);

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: IFeedbackContentStepProps) {
  const { toast } = useToast();

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    try {
      setIsSendingFeedback(true);

      const form = new FormData();

      const json = JSON.stringify({ description: comment, type: feedbackType });
      const blob = new Blob([json], {
        type: 'application/json',
      });
      form.append('feedback', blob);

      const imageToBlob = await fetch(screenshot ?? '').then(res => res.blob());
      form.append('file', imageToBlob as Blob, 'image.png');

      await feedbackService.createFeedbacks(form);

      toast({
        type: 'success',
        title: 'Feedback enviado com sucesso!',
        subTitle:
          'Analisaremos seu feedback enviado e em breve retornamos o contato.',
      });
    } catch (error) {
      toast({
        type: 'error',
        title: 'Não foi possível enviar o feedback!',
        subTitle: 'Por favor, tente novamente mais tarde.',
      });
    } finally {
      setIsSendingFeedback(false);
    }

    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="absolute top-5 left-5 text-zinc-400 hover:text-zinc-100"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
            className="w-6 h-6"
          />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-green-500 focus:ring-green-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder={feedbackTypeInfo.placeholderTextArea}
          value={comment}
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={!comment.length || isSendingFeedback}
            className="p-2 bg-green-500 hover:bg-green-400  rounded-md border-transparent flex flex-1 justify-center items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:hover:bg-green-500 disabled:cursor-not-allowed"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  );
}
