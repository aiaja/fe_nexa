"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ActionButtonsProps {
   
    caseId: string; 
   
    isSubmitting: boolean;
    isSubmitDisabled: boolean;
    
    onSubmit: () => void;
}

export function ActionButtons({ caseId, isSubmitting, isSubmitDisabled, onSubmit }: ActionButtonsProps) {
    const router = useRouter()

    const handleCancel = () => {
        router.back()
    }

    return (
        <div className="flex gap-3 justify-end pt-4">
            <Button 
                onClick={handleCancel} 
                disabled={isSubmitting} 
                variant="outline"
            >
                Cancel
            </Button>
            <Button
                onClick={onSubmit}
                disabled={isSubmitDisabled} 
                className="bg-[#0047AB] hover:bg-[#003580]"
            >
                {isSubmitting ? "Submitting..." : "Update Resolution"}
            </Button>
        </div>
    )
}