import { render, screen } from '@testing-library/react';
import EditQuestDialog from './EditQuestDialog';
import {useRef, useState} from 'react';

describe('<EditQuestDialog />', () => {
    it('renders dialog with quest data', () => {
        const questData = { description: "Test Quest", completed: false };

        render(
            <EditQuestDialog
                quest_id={1}
                questData={questData}
                isOpen={true}
            />
        );

        expect(screen.getByText("Edit Quest")).toBeInTheDocument();
        expect(screen.getByLabelText("Description:")).toHaveValue("Test Quest");
        expect(screen.getByLabelText("Completed:")).not.toBeChecked();
    });
})