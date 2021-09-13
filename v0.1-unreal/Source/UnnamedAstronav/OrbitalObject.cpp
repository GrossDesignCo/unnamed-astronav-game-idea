// Fill out your copyright notice in the Description page of Project Settings.

#include "OrbitalObject.h"

// Sets default values
AOrbitalObject::AOrbitalObject()
{
	// Set this actor to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

	Mass = 1;

//	Body = CreateDefaultSubobject<USphereComponent>(TEXT("Body"));
//	Body->InitSphereRadius(250.0);
//	Body->SetupAttachment(RootComponent);
}

// Called when the game starts or when spawned
void AOrbitalObject::BeginPlay()
{
	Super::BeginPlay();
	// test
}

// Called every frame
void AOrbitalObject::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}
