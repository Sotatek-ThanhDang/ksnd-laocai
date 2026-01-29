import {
  StepIcon,
  styled,
  Typography,
  type TypographyProps,
} from '@mui/material';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MuiStepper from '@mui/material/Stepper';

type StepperProps = {
  activeStep: number;
  steps: { title: string; subtitle: string }[];
};

export const Stepper = ({ steps, activeStep }: StepperProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <MuiStepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={step.title} {...stepProps}>
              <StepLabel
                StepIconComponent={({ active, completed, icon }) => {
                  if (completed) {
                    return (
                      <StepIcon
                        icon={icon}
                        completed={completed}
                        active={active}
                      />
                    );
                  }
                  const isStepActive = active && !completed;
                  return (
                    <IconWrapper isStepActive={isStepActive}>
                      {icon}
                    </IconWrapper>
                  );
                }}
                optional={
                  <StepperSubtitle variant="body2" component="span">
                    {step.subtitle}
                  </StepperSubtitle>
                }
              >
                {step.title}
              </StepLabel>
            </Step>
          );
        })}
      </MuiStepper>
    </Box>
  );
};

const IconWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isStepActive',
})<{ isStepActive?: boolean }>(({ theme, isStepActive }) => ({
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid',
  borderColor: isStepActive
    ? theme.palette.primary.main
    : theme.palette.grey[300],
  backgroundColor: 'transparent',
  color: isStepActive ? theme.palette.primary.main : theme.palette.grey[300],
  fontWeight: 600,
  fontSize: '1rem',
}));

const StepperSubtitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: '0.875rem',
  textAlign: 'center',
  color: theme.palette.grey[700],
  '&, & *': {
    color: `${theme.palette.text.senary} !important`,
  },
}));
