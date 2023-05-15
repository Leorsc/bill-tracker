import { Check } from 'lucide-react';
import React, { useEffect, useState } from 'react';


function CustomStepIcon(props) {
  const { active, completed } = props;
  return (
    <>
      {
        props.icon === 3 ?
          <div
            className={`flex items-center justify-center w-8 h-8 border-dark-green border rounded-full 
          ${active ?
                (!completed && 'bg-dark-green')
                :
                (completed ? 'bg-dark-green' : 'bg-transparent')}`}
          >
            {active ?
              (
                <Check size={16} stroke='white' />
              ) : (
                <div className="bg-dark-green w-2 h-2 rounded-full"></div>
              )
            }
          </div>
          :
          <div
            className={`flex items-center justify-center w-8 h-8 border-dark-green border rounded-full 
          ${active ?
                (completed ? 'bg-dark-green' : 'bg-dark-green')
                :
                (completed ? 'bg-dark-green' : 'bg-transparent')}`}
          >
            {active ? (
              !completed &&
              (
                <div className="bg-white w-2 h-2 rounded-full"></div>
              )
            ) : (
              completed ? (
                <Check size={16} stroke='white' />
              ) : (
                <div className="bg-dark-green w-2 h-2 rounded-full"></div>
              )
            )}
          </div>
      }
    </>
  );
}

export default function VerticalStepper({ formStep }) {
  const [activeStep, setActiveStep] = useState(formStep);

  const steps = [
    {
      label: 'Cadastre-se',
      description: 'Por favor, escreva seu nome e e-mail',
    },
    {
      label: 'Escolha uma senha',
      description: 'Escolha uma senha segura',
    },
    {
      label: 'Cadastro realizado com sucesso',
      description: 'E-mail e senha cadastrados com sucesso',
    },
  ];
  useEffect(() => {
    setActiveStep(formStep)
  }, [formStep])

  return (
    <div className="flex flex-col gap-y-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className='flex gap-6'
        >
          <div className='flex flex-col items-center gap-y-6'>
            <CustomStepIcon icon={index + 1} formStep={formStep} active={activeStep === index} completed={activeStep > index} />
            {index === 2 ?
              <div className='rotate-90 bg-transparent w-10 h-1'></div>
              :
              <div className='rotate-90 bg-dark-green w-10 h-1' ></div>
            }
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-montserrat text-lg text-dark-green font-bold">{step.label}</div>
            <div className="font-nunito text-lg text-dark-slate-grey font-semibold">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}


