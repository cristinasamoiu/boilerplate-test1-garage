'use client'

import { useState } from 'react'

type TeamMember = {
  id: string
  initials: string
  name: string
  role: string
  shortBio: string
  fullBio?: string
}

const teamMembers: TeamMember[] = [
  {
    id: 'cs',
    initials: 'CS',
    name: 'Cristina Samoiu',
    role: 'PM',
    shortBio:
      'Coordinates the team and helps keep the project organised and on track. Manages project tasks, communication and deadlines while supporting the team throughout each stage of the project.',
  },
  {
    id: 'fl',
    initials: 'FL',
    name: 'Frank Laruccia',
    role: 'Dev 1',
    shortBio:
      'Works on developing and implementing the technical features of the project. Helps turn project requirements and designs into functional solutions while collaborating with the team…',
    fullBio:
      'Works on developing and implementing the technical features of the project. Helps turn project requirements and designs into functional solutions while collaborating with the team. Contributes to building, improving and maintaining the application, while ensuring features work correctly and meet the agreed requirements.',
  },
  {
    id: 'ch',
    initials: 'CH',
    name: 'Chanithu Wijethunga',
    role: 'Dev 2',
    shortBio:
      'Contributes to the development and implementation of the project’s technical features. Works collaboratively with the team to build, test and improve the solution throughout the development process.',
  },
  {
    id: 'mj',
    initials: 'MJ',
    name: 'Mahita Jain',
    role: 'BA',
    shortBio:
      'Analyses project requirements and helps the team understand the client’s needs and expectations. Works with team members to ensure the proposed solution remains aligned with the project goals…',
    fullBio:
      'Analyses project requirements and helps the team understand the client’s needs and expectations. Works with team members to ensure the proposed solution remains aligned with the project goals. Supports clarifying scope, documenting requirements and bridging communication between stakeholders and the development team.',
  },
  {
    id: 'hh',
    initials: 'HH',
    name: 'Heidi Henin',
    role: 'UX',
    shortBio:
      'Focuses on creating a clear, consistent and user-friendly experience for the project. Designs interface mockups and layouts while considering usability, visual consistency and the needs of the intended users.',
  },
]

function getRoleStyles(role: string) {
  switch (role) {
    case 'PM':
      return 'bg-gray-100 text-green-700 font-bold'
    case 'Dev 1':
    case 'Dev 2':
      return 'bg-gray-100 text-red-700 font-bold'
    case 'BA':
      return 'bg-gray-100 text-purple-700 font-bold'
    case 'UX':
      return 'bg-gray-100 text-blue-700 font-bold'
    default:
      return 'bg-gray-100 text-gray-600 font-bold'
  }
}

function MemberCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = !!member.fullBio

  return (
    <div className="flex flex-col items-center rounded-xl border border-slate-100 bg-white px-4 pb-4 pt-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-base font-bold tracking-wide text-slate-600">
        {member.initials}
      </div>

      <h3 className="mb-1.5 text-sm font-semibold text-slate-900">
        {member.name}
      </h3>

      <span
        className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-medium ${getRoleStyles(member.role)}`}
      >
        {member.role}
      </span>

      <p className="flex-1 text-left text-xs leading-relaxed text-slate-500">
        {expanded && member.fullBio ? member.fullBio : member.shortBio}
      </p>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-2.5 text-xs font-semibold text-indigo-500 hover:underline"
        >
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </div>
  )
}

export default function TeamPage() {
  return (
    <div className="min-h-full bg-white px-5 py-10 sm:px-10">
      <h1 className="mb-8 text-2xl font-bold tracking-tight text-indigo-600">
        Meet the Team
      </h1>

      <div className="grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}